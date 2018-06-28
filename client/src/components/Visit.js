import React, { Component } from 'react';
import axios from 'axios';

class Visit extends Component {

    state = {
        visitInfo: [],
        patientInfo: []
    }
    componentDidMount() {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        const visitId = this.props.match.params.visitId
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}/visits/${visitId}`).then((res) => {
            this.setState({
                visitInfo: res.data.visit
            })
        })
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}`).then((res) => {
            this.setState({
                patientInfo: res.data.patient
            })
        })
    }

    render() {
        if (this.state.visitInfo._id === undefined) {
            return null
        }
        return (
            <div>
                <h1>{this.state.patientInfo.name}'s visit on {this.state.visitInfo.date}</h1>
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