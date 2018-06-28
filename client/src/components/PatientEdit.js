import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class PatientEdit extends Component {

    state = {
        name: '',
        dateOfBirth: '',
        weight: '',
        height: '',
        occupation: '',
        maritalStatus: '',
        medicalHistory: '',
        visits: []
    }


    componentDidMount() {
        const doctorId = this.props.props.match.params.doctorId
        const patientId = this.props.props.match.params.patientId
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}`).then((res) => {
            this.setState({
                name: res.data.patient.name,
                dateOfBirth: res.data.patient.dateOfBirth,
                weight: res.data.patient.weight,
                height: res.data.patient.height,
                occupation: res.data.patient.occupation,
                maritalStatus: res.data.patient.maritalStatus,
                medicalHistory: res.data.patient.medicalHistory,
                visits: res.data.patient.visits
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
        axios.put(`/api/doctors/${doctorId}/patients/${patientId}`, this.state).then((res)=> {
            const currentPatient = res.data.doctor.patients.find((patient)=> patient._id === patientId)
            this.props.updateStateEdit(currentPatient)
            this.props.handlePatientView()
        })
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <input placeholder={this.state.name} type="text" name="name" value={this.state.name} onChange={this.handleChange} />

                    <label>Date of Birth: </label>
                    <input placeholder={this.state.dateOfBirth} type="date" name="dateOfBirth" value={moment(this.state.dateOfBirth).format("YYYY-MM-DD")} onChange={this.handleChange} />

                    <label>Weight: </label>
                    <input placeholder={this.state.weight} type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />

                    <label>Height: </label>
                    <input placeholder={this.state.height} type="number" name="height" value={this.state.height} onChange={this.handleChange} />

                    <label>Occupation: </label>
                    <input placeholder={this.state.occupation} type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange} />

                    <label>Marital Status: </label>
                    <input placeholder={this.state.maritalStatus} type="text" name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleChange} />

                    <label>Medical History: </label>
                    <input placeholder={this.state.medicalHistory} type="text" name="medicalHistory" value={this.state.medicalHistory} onChange={this.handleChange} />

                    <button type='submit'>Save New Patient</button>
                </form>
            </div>
        );
    }
}

export default PatientEdit;