require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const { DoctorModel, PatientModel, VisitModel } = require('./schema')

const visit1 = new VisitModel({
    date: new Date(),
    chiefComplaint: 'Headache',
    duration: '5 Days',
    associatedSymptoms: 'Nausea, Vomiting, Photophobia',
    diagnosis: 'Migraine HA',
    treatment: 'Fluids, Pain Meds'
})

const jeremy = new PatientModel({
    name: 'Jeremy Edwards',
    dateOfBirth: new Date(2005, 4, 5),
    sex: 'Male',
    weight: 165,
    height: 70,
    occupation: 'Janitor',
    maritalStatus: 'Married',
    medicalHistory: 'Hypertension',
    visits: [visit1]
})

const doc1 = new DoctorModel({
    name: 'Doctor Jay',
    password: 'password1',
    patients: [jeremy]
})

DoctorModel.remove({})
    .then(() => doc1.save())
    .then(() => console.log('Successfully Seeded'))
    .then(() => mongoose.connection.close())