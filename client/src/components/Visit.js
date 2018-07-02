import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import VisitEdit from './VisitEdit';
import { VisitStyle, VisitInfoStyle } from './Styled/VisitStyle';
import { Button, teal, maroon, green } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';
import Nav from './Nav';

class Visit extends Component {

    state = {
        visitInfo: [],
        patientInfo: [],
        editView: false,
        deleteView: false,
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

    updateStateEdit = (data) => {
        this.setState({
            visitInfo: data
        })
    }

    handleEditView = () => {
        let editView = !this.state.editView
        this.setState({
            editView
        })
    }
    handleDelete = () => {
        const doctorId = this.props.match.params.doctorId
        const patientId = this.props.match.params.patientId
        const visitId = this.props.match.params.visitId
        axios.delete(`/api/doctors/${doctorId}/patients/${patientId}/visits/${visitId}`).then((res) => {
            this.props.history.push(`/${doctorId}/${patientId}`)
        })
    }
    updateStateDelete = () => {
        let deleteView = !this.state.deleteView
        this.setState({
            deleteView
        })
    }

    render() {
        if (this.state.visitInfo._id === undefined) {
            return null
        }
        return (
            <div>
                <Nav props={this.props}/>
                <VisitStyle>
                    <h2>{this.state.patientInfo.name}'s visit on {moment(this.state.visitInfo.date).format("MMM Do YYYY")}</h2>
                    <div>
                        <h3>About This Visit</h3>
                        <VisitInfoStyle>
                            <li>Date: {moment(this.state.visitInfo.date).format("MMM Do YYYY")}</li>
                            <li>Chief Complaint: {this.state.visitInfo.chiefComplaint}</li>
                            <li>Duration: {this.state.visitInfo.duration}</li>
                            <li>Associated Symptoms: {this.state.visitInfo.associatedSymptoms}</li>
                            <li>Diagnosis: {this.state.visitInfo.diagnosis}</li>
                            <li>Treatment: {this.state.visitInfo.treatment}</li>
                        </VisitInfoStyle>
                    </div>
                    <div>
                        <ThemeProvider theme={teal}>
                            <div>
                                <Button onClick={this.handleEditView}>{this.state.editView ? "Close Edit Form" : "Edit Visit Info"}</Button>
                                {this.state.editView
                                    ?
                                    <VisitEdit updateStateEdit={this.updateStateEdit} handleEditView={this.handleEditView} props={this.props} />
                                    :
                                    null
                                }
                            </div>
                        </ThemeProvider>
                    </div>
                    <ThemeProvider theme={maroon}>
                        {this.state.deleteView ? <p>Are You Sure?</p> : <Button onClick={this.updateStateDelete}>Delete This Visit</Button>}
                    </ThemeProvider>
                    <ThemeProvider theme={green}>
                        {this.state.deleteView ? <Button onClick={this.updateStateDelete}>No!</Button> : null}
                    </ThemeProvider>
                    <ThemeProvider theme={maroon}>
                        {this.state.deleteView ? <Button onClick={this.handleDelete}>Yes. Delete Me!</Button> : null}
                    </ThemeProvider>
                </VisitStyle>
            </div>
        );
    }
}

export default Visit;