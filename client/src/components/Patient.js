import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PatientEdit from './PatientEdit';

class Patient extends Component {

    state = {
        editView: false,
        patientInfo: []
    }

    componentDidMount() {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        axios.get(`/api/doctors/${doctorId}/patients/${patientId}`).then((res) => {
            this.setState({
                patientInfo: res.data.patient
            })
        })
    }

    updateStateEdit = (data) => {
        this.setState({
            patientInfo: data
        })
    }

    handlePatientView = () => {
        let editView = this.state.editView
        editView = !this.state.editView
        this.setState({
            editView
        })
    }
    handleDelete = () => {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        axios.delete(`/api/doctors/${doctorId}/patients/${patientId}`).then((res)=> {
            this.props.history.push(`/${doctorId}`)
            console.log(res.data.doctor)
        })
    }

    render() {
        const currentDoctor = this.props.doctors.find((doctor) => doctor._id === this.props.match.params.doctorId)
        if (currentDoctor === undefined) {
            return null
        }
        if (this.state.patientInfo.visits === undefined) {
            return null
        }
        const currentPatient = currentDoctor.patients.find((patient) => patient._id === this.props.match.params.patientId)
        const visits = this.state.patientInfo.visits.map((visit, i) => {
            return (
                <li key={i}>
                    <Link to={`/${currentDoctor._id}/${currentPatient._id}/${visit._id}`}>Date: {visit.date}</Link>
                    <span> Chief Complaint: {visit.chiefComplaint}</span>
                </li>
            )
        })
        return (
            <div>
                <h1>{this.state.patientInfo.name}'s Chart</h1>
                <ul>
                    <li>Date of Birth: {this.state.patientInfo.dateOfBirth}</li>
                    <li>Weight: {this.state.patientInfo.weight} lbs</li>
                    <li>Height: {this.state.patientInfo.height}in</li>
                    <li>Occupation: {this.state.patientInfo.occupation}</li>
                    <li>Marital Status: {this.state.patientInfo.maritalStatus}</li>
                    <li>Medical History: {this.state.patientInfo.medicalHistory}</li>
                </ul>
                <div>
                    <button onClick={this.handlePatientView}>{this.state.editView ? "Close Patient Form" : "Edit Patient Info"}</button>
                    {this.state.editView
                        ?
                        <PatientEdit updateStateEdit={this.updateStateEdit} props={this.props} />
                        :
                        null
                    }
                </div>
                <button onClick={this.handleDelete}>Delete Patient</button>
                <h3>All Visits Recorded</h3>
                <ul>
                    {visits}
                </ul>
            </div>
        );
    }
}


export default Patient;