import React, { Component } from 'react';
import axios from 'axios';

class Visit extends Component {
    
    state = {
        visitInfo: [],
    }
    componentDidMount() {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        const visitId = this.props.match.params.visitId
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}/visits/${visitId}`).then((res)=> {
            this.setState({
                visitInfo: res.data.visit
            })
            console.log(res.data)
        })
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}`)
    }
    
    render() {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        const currentDoctor = this.props.doctors.find((doctor)=> doctor._id === doctorId)
        if (currentDoctor === undefined) {
            return null
        }
        const currentPatient = currentDoctor.patients.find((patient)=> patient._id === patientId)
        
        if (this.state.visitInfo._id === undefined) {
            return null
        }
        return (
            <div>
                <h1>{currentPatient.name}'s visit on {this.state.visitInfo.date}</h1>
                <h3>About This Visit</h3>
                <ul>
                    <li>Date: {this.state.visitInfo.date}</li>
                    <li>Chief Complaint: {this.state.visitInfo.chiefComplaint}</li>
                    <li>Duration: {this.state.visitInfo.duration}</li>
                    <li>Associated Symptoms: {this.state.visitInfo.associatedSymptoms}</li>
                    <li>Diagnosis: {this.state.visitInfo.diagnosis}</li>
                    <li>Treatment: {this.state.visitInfo.treatment}</li>
                </ul>
            </div>
        );
    }
}

export default Visit;