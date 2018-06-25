const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VisitSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    chiefComplaint: {
        type: String,
        required: true
    },
    duration: {
        type: String
    },
    associatedSymptoms: {
        type: String
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    }
})

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    occupation: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    medicalHistory: {
        type: String
    },
    visits: [VisitSchema]
})

const DoctorSchema = new Schema({
    name: {
        type: String,
        default: 'Name'
    },
    password: {
        type: String,
    },
    patients: [PatientSchema]
})

const DoctorModel = mongoose.model('Doctor', DoctorSchema)
const PatientModel = mongoose.model('Patient', PatientSchema)
const VisitModel = mongoose.model('Visit', VisitSchema)

module.exports = {
    DoctorModel,
    PatientModel,
    VisitModel
}