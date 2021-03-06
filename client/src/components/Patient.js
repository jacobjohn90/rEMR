import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Button, green, maroon, teal } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';

import PatientEdit from './PatientEdit';
import VisitNew from './VisitNew';
import { PatientStyle, PatientInfoStyle, VisitListStyle } from './Styled/PatientStyle';
import Nav from './Nav';

class Patient extends Component {

    state = {
        editView: false,
        patientInfo: [],
        newView: false,
        deleteView: false
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

    updateStateDelete = () => {
        let deleteView = !this.state.deleteView
        this.setState({
            deleteView
        })
    }

    handleDelete = () => {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        axios.delete(`/api/doctors/${doctorId}/patients/${patientId}`).then((res) => {
            this.props.history.push(`/${doctorId}`)
            this.updateStateDelete()

        })
    }

    handleUpdateStateNew = (data) => {
        this.setState({
            patientInfo: data
        })
    }

    updateStateNew = () => {
        let newView = !this.state.newView
        this.setState({
            newView
        })
    }

    render() {

        const currentDoctor = this.props.doctors.find((doctor) => doctor._id === this.props.match.params.doctorId)
        if (currentDoctor === undefined) {
            return (
                <Nav />
            )
        }

        if (this.state.patientInfo.visits === undefined) {
            return (
                <Nav />
            )
        }

        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        const visits = this.state.patientInfo.visits.map((visit, i) => {
            return (
                <li key={i}>
                    <Link to={`/${doctorId}/${patientId}/${visit._id}`}>{moment(visit.date).format("MMM Do YYYY")}</Link>
                    <span> Chief Complaint: {visit.chiefComplaint}</span>
                </li>
            )
        })
        
        return (
            <div>
                <Nav props={this.props}/>
                <PatientStyle>
                    <h1>{this.state.patientInfo.name}'s Chart</h1>
                    <PatientInfoStyle>
                        <li>Date of Birth: {moment(this.state.patientInfo.dateOfBirth).format("MMM Do YYYY")}</li>
                        <li>Sex: {this.state.patientInfo.sex}</li>
                        <li>Weight: {this.state.patientInfo.weight} lbs</li>
                        <li>Height: {this.state.patientInfo.height}in</li>
                        <li>Occupation: {this.state.patientInfo.occupation}</li>
                        <li>Marital Status: {this.state.patientInfo.maritalStatus}</li>
                        <li>Medical History: {this.state.patientInfo.medicalHistory}</li>
                    </PatientInfoStyle>
                    <div>
                        <ThemeProvider theme={teal}>
                            <Button onClick={this.handlePatientView}>{this.state.editView ? "Close Patient Form" : "Edit Patient Info"}</Button>
                        </ThemeProvider>
                        {this.state.editView
                            ?
                            <PatientEdit updateStateEdit={this.updateStateEdit} handlePatientView={this.handlePatientView} props={this.props} />
                            :
                            null
                        }
                    </div>
                    <ThemeProvider theme={maroon}>
                        {!this.state.deleteView ? <Button onClick={this.updateStateDelete}>Delete Patient</Button> : <p>Are You Sure?</p>}
                    </ThemeProvider>
                    <ThemeProvider theme={green}>
                        {this.state.deleteView ? <Button onClick={this.updateStateDelete}>No!</Button> : null}
                    </ThemeProvider>
                    <ThemeProvider theme={maroon}>
                        {this.state.deleteView ? <Button onClick={this.handleDelete}>Yes. Delete Me!</Button> : null}
                    </ThemeProvider>
                    <h3>All Visits Recorded</h3>
                    <VisitListStyle>
                        {visits}
                    </VisitListStyle>
                    <div>
                        <ThemeProvider theme={green}>
                            <Button onClick={this.updateStateNew}>{this.state.newView ? "Close New Visit Form" : "Create New Visit"} </Button>
                        </ThemeProvider>
                        {this.state.newView
                            ?
                            <VisitNew handleUpdateStateNew={this.handleUpdateStateNew} updateStateNew={this.updateStateNew} props={this.props} />
                            :
                            null
                        }
                    </div>
                </PatientStyle>
            </div>
        );
    }
}


export default Patient;