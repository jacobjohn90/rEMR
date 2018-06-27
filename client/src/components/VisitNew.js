import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post(`/api/doctors/${doctorId}/patients/${patientId}/visits`, this.state).then((res)=> {
            const currentPatient = res.data.doctor.patients.find((patient)=> patient._id === patientId)
            this.props.handleUpdateStateNew(currentPatient)
        })
        
    }
    
    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Date: </label>
                    <input type="date" name="date" onChange={this.handleChange} />

                    <label>Cheif Complaint: </label>
                    <input placeholder="Chief Complaint" type="text" name="chiefComplaint" onChange={this.handleChange} />

                    <label>Duration: </label>
                    <input placeholder="Duration" type="text" name="duration" onChange={this.handleChange} />

                    <label>Associated Symptoms: </label>
                    <input placeholder="Associated Symptoms" type="text" name="associatedSymptoms" onChange={this.handleChange} />

                    <label>Diagnosis: </label>
                    <input placeholder="Diagnosis" type="text" name="diagnosis" onChange={this.handleChange} />

                    <label>Treatment: </label>
                    <input placeholder="Treatment" type="text" name="treatment" onChange={this.handleChange} />

                    <button type='submit'>Save New Visit</button>
                </form>
            </div>
        );
    }
}

export default VisitNew;