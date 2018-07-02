import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { PatientEditStyle } from './Styled/PatientStyle';
import { Button, teal } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';

class PatientEdit extends Component {

    state = {
        name: '',
        dateOfBirth: '',
        sex: '',
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
                sex: res.data.patient.sex,
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
        axios.put(`/api/doctors/${doctorId}/patients/${patientId}`, this.state).then((res) => {
            const currentPatient = res.data.doctor.patients.find((patient) => patient._id === patientId)
            this.props.updateStateEdit(currentPatient)
            this.props.handlePatientView()
        })
    }

    render() {

        return (
            <PatientEditStyle>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input placeholder={this.state.name} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Date of Birth: </label>
                        <input placeholder={this.state.dateOfBirth} type="date" name="dateOfBirth" value={moment(this.state.dateOfBirth).format("YYYY-MM-DD")} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="sex">Sex:</label>
                        <input placeholder={this.state.sex} type="text" name="sex" value={this.state.sex} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input placeholder={this.state.weight} type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Height: </label>
                        <input placeholder={this.state.height} type="number" name="height" value={this.state.height} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Occupation: </label>
                        <input placeholder={this.state.occupation} type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Marital Status: </label>
                        <input placeholder={this.state.maritalStatus} type="text" name="maritalStatus" value={this.state.maritalStatus} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Medical History: </label>
                        <input placeholder={this.state.medicalHistory} type="text" name="medicalHistory" value={this.state.medicalHistory} onChange={this.handleChange} />
                    </div>
                    <ThemeProvider theme={teal}>
                        <Button type='submit'>Save Changes</Button>
                    </ThemeProvider>
                </form>
            </PatientEditStyle>
        );
    }
}

export default PatientEdit;