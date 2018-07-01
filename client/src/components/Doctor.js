import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, green, maroon, teal } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';

import NewPatient from './NewPatient';
import DoctorStyle from './Styled/DoctorStyle';

class Doctor extends Component {

    state = {
        name: '',
        password: '',
        editView: false,
        newPatientView: false,
        deleteView: false,
        editDoc: {
            name: '',
            password: '',
            passwordRepeat: ''
        },
    }

    handleDelete = () => {
        const doctorId = this.props.match.params.doctorId
        axios.delete(`/api/doctors/${doctorId}`).then((res) => {

            this.props.history.push('/')

        })
    }

    handleEditView = () => {
        let editView = this.state.editView
        editView = !this.state.editView
        this.setState({
            editView
        })

    }
    handleNewPatientView = () => {
        let newPatientView = this.state.newPatientView
        newPatientView = !this.state.newPatientView
        this.setState({
            newPatientView
        })
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        const editDoc = { ...this.state.editDoc }
        editDoc[inputName] = userInput
        this.setState({
            editDoc
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const doctorId = this.props.match.params.doctorId
        const editDoc = this.props.doctors.find((doctor) => doctor.name === this.state.editDoc.name)
        if (this.state.editDoc.password === this.state.editDoc.passwordRepeat && (editDoc === undefined || editDoc.name === this.state.name)) {
            axios.put(`/api/doctors/${doctorId}`, this.state.editDoc).then((res) => {
                this.handleEditView()
                this.setState({
                    name: res.data.name,
                    password: res.data.password
                })
            })
        } else if (this.state.editDoc.password !== this.state.editDoc.passwordRepeat) {
            alert('Passwords Do Not Match. Try Again')
        } else if (editDoc.name !== this.state.name && editDoc !== undefined) {
            alert('Username Already Taken. Try your currently used name or another name')
        }
    }
    updateStateNewPatient = (data) => {
        this.setState({
            patients: data
        })
    }
    updateStateDelete = () => {
        let deleteView = !this.state.deleteView
        this.setState({
            deleteView
        })
    }

    componentDidMount() {
        const doctorId = this.props.match.params.doctorId
        axios.get(`/api/doctors/${doctorId}`).then((res) => {
            this.setState({
                name: res.data.doctor.name,
                password: res.data.doctor.password,
                patients: res.data.doctor.patients
            })
        })
    }

    render() {

        if (this.state.patients === undefined) {
            return null
        }
        const doctorId = this.props.match.params.doctorId
        const patient = this.state.patients.map((patient, i) => {
            return (
                <li key={i}>
                    <Link to={`/${doctorId}/${patient._id}`}>{patient.name}</Link>
                </li>
            )
        })

        return (
            <DoctorStyle>
                <div>
                    <h2>Welcome {this.state.name}</h2>
                </div>
                <div>
                    <ThemeProvider theme={teal}>
                        <div>
                            <Button onClick={this.handleEditView}>{this.state.editView ? "Close Edit View" : "Edit User Info"} </Button>

                            {this.state.editView
                                ?
                                <form onSubmit={this.handleSubmit}>
                                    <input placeholder={this.state.name} type="text" name="name" value={this.state.editDoc.name} onChange={this.handleChange} />
                                    <input placeholder={this.state.password} type="text" name="password" value={this.state.editDoc.password} onChange={this.handleChange} />
                                    <input placeholder="Repeat Password" type="text" name="passwordRepeat" value={this.state.editDoc.passwordRepeat} onChange={this.handleChange} />
                                    <Button type='submit'>Save Edits</Button>
                                </form>
                                :
                                null}
                        </div>
                    </ThemeProvider>
                </div>
                <div>
                    <div>

                        <h3>Your current Patient List is:</h3>
                        <ul>
                            {patient}
                        </ul>
                        <ThemeProvider theme={green}>
                            <Button onClick={this.handleNewPatientView}>{this.state.newPatientView ? "Close New Patient Form" : "Add New Patient"} </Button>
                        </ThemeProvider>
                        {this.state.newPatientView
                            ?
                            <NewPatient updateStateNewPatient={this.updateStateNewPatient} handleNewPatientView={this.handleNewPatientView} props={this.props} />
                            :
                            null}
                    </div>
                    <div>
                        <ThemeProvider theme={maroon}>
                            {!this.state.deleteView ? <Button onClick={this.updateStateDelete}>Delete Patient</Button> : <p>Are You Sure?</p>}
                        </ThemeProvider>
                    </div>
                    <div>
                        <ThemeProvider theme={green}>
                            {this.state.deleteView ? <Button onClick={this.updateStateDelete}>No!</Button> : null}
                        </ThemeProvider>
                    </div>
                    <div>
                        <ThemeProvider theme={maroon}>
                            {this.state.deleteView ? <Button onClick={this.handleDelete}>Yes. Delete Me!</Button> : null}
                        </ThemeProvider>
                    </div>
                </div>
            </DoctorStyle>
        );
    }
}

export default Doctor;