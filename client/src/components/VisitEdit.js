import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class VisitEdit extends Component {

    state = {
        date: '',
        chiefComplaint: '',
        duration: '',
        associatedSymptoms: '',
        diagnosis: '',
        treatment: '',
    }

    componentDidMount() {
        const doctorId = this.props.props.match.params.doctorId
        const patientId = this.props.props.match.params.patientId
        const visitId = this.props.props.match.params.visitId
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}/visits/${visitId}`).then((res) => {
            this.setState({
                date: res.data.visit.date,
                chiefComplaint: res.data.visit.chiefComplaint,
                duration: res.data.visit.duration,
                associatedSymptoms: res.data.visit.associatedSymptoms,
                diagnosis: res.data.visit.diagnosis,
                treatment: res.data.visit.treatment
            })
        })
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value

        this.setState({
            [inputName]: userInput
        })

    }
    handleSubmit = (event) => {
        event.preventDefault()
        const doctorId = this.props.props.match.params.doctorId
        const patientId = this.props.props.match.params.patientId
        const visitId = this.props.props.match.params.visitId
        axios.put(`/api/doctors/${doctorId}/patients/${patientId}/visits/${visitId}`, this.state).then((res) => {
            const currentPatient = res.data.doctor.patients.find((patient) => patient._id === patientId)
            const currentVisit = currentPatient.visits.find((visit) => visit._id === visitId)
            this.props.updateStateEdit(currentVisit)
            this.props.handleEditView()
        })
    }

    render() {

        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Date: </label>
                        <input type="date" name="date" value={moment(this.state.date).format("YYYY-MM-DD")} onChange={this.handleChange} />

                        <label>Cheif Complaint: </label>
                        <input placeholder={this.state.chiefComplaint} type="text" name="chiefComplaint" value={this.state.chiefComplaint} onChange={this.handleChange} />

                        <label>Duration: </label>
                        <input placeholder={this.state.duration} type="text" name="duration" value={this.state.duration} onChange={this.handleChange} />

                        <label>Associated Symptoms: </label>
                        <input placeholder={this.state.associatedSymptoms} type="text" name="associatedSymptoms" value={this.state.associatedSymptoms} onChange={this.handleChange} />

                        <label>Diagnosis: </label>
                        <input placeholder={this.state.diagnosis} type="text" name="diagnosis" value={this.state.diagnosis} onChange={this.handleChange} />

                        <label>Treatment: </label>
                        <input placeholder={this.state.treatment} type="text" name="treatment" value={this.state.treatment} onChange={this.handleChange} />

                        <button type='submit'>Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default VisitEdit;