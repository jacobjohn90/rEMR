import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Patient extends Component {
    render() {
        const currentDoctor = this.props.doctors.find((doctor) => doctor._id === this.props.match.params.doctorId)
        if (currentDoctor === undefined) {
            return null
        }
        const currentPatient = currentDoctor.patients.find((patient) => patient._id === this.props.match.params.patientId)
        console.log(currentPatient)
        const visits = currentPatient.visits.map((visit, i) => {
            return (
                <li key={i}>
                    <Link to={`/${currentDoctor._id}/${currentPatient._id}/${visit._id}`}>Date: {visit.date}</Link>
                    <span> Chief Complaint: {visit.chiefComplaint}</span>
                </li>
            )
        })
        return (
            <div>
                <h1>{currentPatient.name}'s Chart</h1>
                <ul>
                    <li>Date of Birth: {currentPatient.dateOfBirth}</li>
                    <li>Weight: {currentPatient.weight}lbs</li>
                    <li>Height: {currentPatient.height}cm</li>
                    <li>Occupation: {currentPatient.occupation}</li>
                    <li>Marital Status: {currentPatient.maritalStatus}</li>
                    <li>Medical History: {currentPatient.medicalHistory}</li>
                </ul>

                <h3>All Visits Recorded</h3>
                    <ul>
                        {visits}
                    </ul>
            </div>
        );
    }
}


export default Patient;