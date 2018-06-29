import React, { Component } from 'react';
import axios from 'axios';
import { Button, green } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';
import NewPatientStyle from './Styled/NewPatientStyle';


class NewPatient extends Component {

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
        axios.post(`/api/doctors/${doctorId}/patients`, this.state).then((res) => {
            this.props.updateStateNewPatient(res.data.doctor.patients)
            this.props.handleNewPatientView()
        })
    }


    render() {
        return (

            <div>
                <NewPatientStyle onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input placeholder="Name" type="text" name="name" onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input type="date" name="dateOfBirth" onChange={this.handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="weight">Weight(lbs):</label>
                        <input placeholder="Weight" type="number" name="weight" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="height">Height(in):</label>
                        <input placeholder="Height" type="number" name="height" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Occupation">Occupation:</label>
                        <input placeholder="Occupation" type="text" name="occupation" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="maritalStatus">Marital Status:</label>
                        <input placeholder="Marital Status" type="text" name="maritalStatus" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="medicalHistory">Medical History:</label>
                        <input placeholder="Medical History" type="text" name="medicalHistory" onChange={this.handleChange} required/>
                    </div>

                    <ThemeProvider theme={green}>
                        <Button type='submit'>Save New Patient</Button>
                    </ThemeProvider>
                </NewPatientStyle>
            </div>
        );
    }
}

export default NewPatient;
