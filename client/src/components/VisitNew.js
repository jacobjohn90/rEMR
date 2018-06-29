import React, { Component } from 'react';
import axios from 'axios';
import { NewListStyle } from './Styled/PatientStyle';
import { Button, teal, green } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';

class VisitNew extends Component {

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
        axios.post(`/api/doctors/${doctorId}/patients/${patientId}/visits`, this.state).then((res) => {
            const currentPatient = res.data.doctor.patients.find((patient) => patient._id === patientId)
            this.props.handleUpdateStateNew(currentPatient)
        })

    }

    render() {

        return (
            <NewListStyle>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Date: </label>
                        <input type="date" name="date" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Cheif Complaint: </label>
                        <input placeholder="Chief Complaint" type="text" name="chiefComplaint" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Duration: </label>
                        <input placeholder="Duration" type="text" name="duration" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Associated Symptoms: </label>
                        <input placeholder="Associated Symptoms" type="text" name="associatedSymptoms" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Diagnosis: </label>
                        <input placeholder="Diagnosis" type="text" name="diagnosis" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Treatment: </label>
                        <input placeholder="Treatment" type="text" name="treatment" onChange={this.handleChange} />
                    </div>
                    <ThemeProvider theme={green}>
                        <Button type='submit'>Save New Visit</Button>
                    </ThemeProvider>
                </form>
            </NewListStyle>
        );
    }
}

export default VisitNew;