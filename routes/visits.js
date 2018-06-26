const express = require('express');
const router = express.Router({ mergeParams: true })
const { DoctorModel, VisitModel } = require('../db/schema')

router.get('/', (req, res) => {
    const doctorId = req.params.doctorId
    const patientId = req.params.patientId
    DoctorModel.findById(doctorId).then((doctor) => {
        const patient = doctor.patients.id(patientId)
        const visits = patient.visits
        res.send({
            visits
        })
    })
})

router.get('/:visitId', (req, res) => {
    const doctorId = req.params.doctorId
    const patientId = req.params.patientId
    const visitId = req.params.visitId
    DoctorModel.findById(doctorId).then((doctor) => {
        const patient = doctor.patients.id(patientId)
        const visit = patient.visits.id(visitId)
        res.send({
            visit
        })
    })
})

router.post('/', (req, res) => {
    const doctorId = req.params.doctorId
    const patientId = req.params.patientId
    const newVisit = new VisitModel(req.body)
    DoctorModel.findById(doctorId).then((doctor) => {
        const patient = doctor.patients.id(patientId)
        patient.visits.push(newVisit)
        return doctor.save()
    }).then((savedDoctor => {
        res.send({
            doctor: savedDoctor
        })
    }))
})

router.put('/:visitId', async (req, res)=> {
    const doctor = await DoctorModel.findById(req.params.doctorId)
    const patientId = req.params.patientId
    const visitId = req.params.visitId
    const patient = doctor.patients.id(patientId)
    const visitToEdit = patient.visits.id(visitId)
    visitToEdit.date = req.body.date
    visitToEdit.chiefComplaint = req.body.chiefComplaint
    visitToEdit.duration = req.body.duration
    visitToEdit.associatedSymptoms = req.body.associatedSymptoms
    visitToEdit.diagnosis = req.body.diagnosis
    visitToEdit.treatment = req.body.treatment
    const savedDoctor = await doctor.save()
    res.send({
        doctor: savedDoctor
    })
})

router.delete('/:visitId', async (req, res)=> {
    const doctor = await DoctorModel.findById(req.params.doctorId)
    const patientId = req.params.patientId
    const visitId = req.params.visitId
    const patient = doctor.patients.id(patientId)
    patient.visits.id(visitId).remove()
    const savedDoctor = await doctor.save()
    res.send({
        doctor: savedDoctor
    })
})
module.exports = router