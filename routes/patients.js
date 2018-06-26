const express = require('express');
const router = express.Router({mergeParams:true})
const {DoctorModel, PatientModel} = require('../db/schema')

router.get('/', (req, res)=> {
    DoctorModel.findById(req.params.doctorId).then((doctor)=> {
        res.send({
            patients: doctor.patients
        })
    })
})
 router.get('/:patientId', (req, res)=> {
     const doctorId = req.params.doctorId
     const patientId = req.params.patientId
     DoctorModel.findById(doctorId).then((doctor)=> {
         res.send({
             patient: doctor.patients.id(patientId)
            })
     })
 })

router.post('/', (req, res) => {
    DoctorModel.findById(req.params.doctorId).then((doctor)=> {
        const newPatient = new PatientModel(req.body)
        doctor.patients.push(newPatient)
        return doctor.save()
    }).then(savedDoctor=> {
        res.send({
            doctor: savedDoctor
        })
    })
})

router.put('/:patientId', async (req, res)=> {
    const doctor = await DoctorModel.findById(req.params.doctorId)
    const patientId = req.params.patientId
    const patientToEdit = doctor.patients.id(patientId)
    patientToEdit.name = req.body.name
    patientToEdit.dateOfBirth = req.body.dateOfBirth
    patientToEdit.weight = req.body.weight
    patientToEdit.height = req.body.height
    patientToEdit.occupation = req.body.occupation
    patientToEdit.maritalStatus = req.body.maritalStatus
    patientToEdit.medicalHistory = req.body.medicalHistory
    const savedDoctor = await doctor.save()
    res.send({
        doctor: savedDoctor
    })

})

router.delete('/:patientId', async (req, res)=> {
    const doctor  = await DoctorModel.findById(req.params.doctorId)
    const patientId = req.params.patientId
    doctor.patients.id(patientId).remove()
    const savedDoctor = await doctor.save()
    res.send({
        doctor: savedDoctor
    })
})
module.exports = router;