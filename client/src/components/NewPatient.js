import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post(`/api/doctors/${doctorId}/patients`, this.state).then((res)=> {
            this.props.updateStateNewPatient(res.data.doctor.patients)
            this.props.handleNewPatientView()
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: </label>
                    <input placeholder="Name" type="text" name="name" onChange={this.handleChange} />
                   
                    <label>Date of Birth: </label>
                    <input type="date" name="dateOfBirth" onChange={this.handleChange} />
                   
                    <label>Weight: </label>
                    <input placeholder="Weight" type="number" name="weight" onChange={this.handleChange} />
                    
                    <label>Height: </label>
                    <input placeholder="Height" type="number" name="height" onChange={this.handleChange} />
                    
                    <label>Occupation: </label>
                    <input placeholder="Occupation" type="text" name="occupation" onChange={this.handleChange} />
                    
                    <label>Marital Status: </label>
                    <input placeholder="Marital Status" type="text" name="maritalStatus" onChange={this.handleChange} />
                    
                    <label>Medical History: </label>
                    <input placeholder="Medical History" type="text" name="medicalHistory" onChange={this.handleChange} />
                    
                    <button type='submit'>Save New Patient</button>
                </form>
            </div>
        );
    }
}

export default NewPatient;


{/* <li>Date of Birth: {currentPatient.dateOfBirth}</li>
                    <li>Weight: {currentPatient.weight}lbs</li>
                    <li>Height: {currentPatient.height}cm</li>
                    <li>Occupation: {currentPatient.occupation}</li>
                    <li>Marital Status: {currentPatient.maritalStatus}</li>
                    <li>Medical History: {currentPatient.medicalHistory}</li> */}