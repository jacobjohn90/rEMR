import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import VisitEdit from './VisitEdit';

class Visit extends Component {

    state = {
        visitInfo: [],
        patientInfo: [],
        editView: false,
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

    render() {
        if (this.state.visitInfo._id === undefined) {
            return null
        }
        return (
            <div>
                <h1>{this.state.patientInfo.name}'s visit on {moment(this.state.visitInfo.date).format("MMM Do YYYY")}</h1>
                <div>
                    <h3>About This Visit</h3>
                    <ul>
                        <li>Date: {moment(this.state.visitInfo.date).format("MMM Do YYYY")}</li>
                        <li>Chief Complaint: {this.state.visitInfo.chiefComplaint}</li>
                        <li>Duration: {this.state.visitInfo.duration}</li>
                        <li>Associated Symptoms: {this.state.visitInfo.associatedSymptoms}</li>
                        <li>Diagnosis: {this.state.visitInfo.diagnosis}</li>
                        <li>Treatment: {this.state.visitInfo.treatment}</li>
                    </ul>
                </div>
                <div>
                    <button onClick={this.handleEditView}>{this.state.editView ? "Close Edit Form" : "Edit Visit Info"}</button>
                    {this.state.editView
                        ?
                        <VisitEdit updateStateEdit={this.updateStateEdit} handleEditView={this.handleEditView} props={this.props} />
                        :
                        null
                    }
                </div>
                <button onClick={this.handleDelete}>Delete This Visit</button>
            </div>
        );
    }
}

export default Visit;