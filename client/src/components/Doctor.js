import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewPatient from './NewPatient';

class Doctor extends Component {

    state = {
        name: '',
        password: '',
        editView: false,
        newPatientView: true,
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
            console.log(res.data)
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
        const currentDoctor = this.props.doctors.find((doctor) => doctor._id === this.props.match.params.doctorId)

        if (currentDoctor === undefined) {
            return null
        }
        if (this.state.patients === undefined) {
            return null
        }
        const patient = this.state.patients.map((patient, i) => {
            return (
                <li key={i}>
                    <Link to={`/${currentDoctor._id}/${patient._id}`}>{patient.name}</Link>
                </li>
            )
        })

        return (
            <div>
                <h1>Welcome {this.state.name}</h1>
                <button onClick={this.handleEditView}>{this.state.editView ? "Close Edit View" : "Edit User Info"} </button>
                {this.state.editView
                    ?
                    <form onSubmit={this.handleSubmit}>
                        <label>Name: </label>
                        <input placeholder={this.state.name} type="text" name="name" value={this.state.editDoc.name} onChange={this.handleChange} />
                        <label>Password: </label>
                        <input placeholder={this.state.password} type="text" name="password" value={this.state.editDoc.password} onChange={this.handleChange} />
                        <label>Repeat Password: </label>
                        <input placeholder="Repeat Password" type="text" name="passwordRepeat" value={this.state.editDoc.passwordRepeat} onChange={this.handleChange} />
                        <button type='submit'>Save Edits</button>
                    </form>
                    :
                    null}
                <div>
                    <div>

                        <h3>Your current Patient List is:</h3>
                        <ul>
                            {patient}
                        </ul>
                        <button onClick={this.handleNewPatientView}>{this.state.newPatientView ? "Close New Patient Form" : "Add New Patient"} </button>
                        {this.state.newPatientView
                            ?
                            <NewPatient updateStateNewPatient= {this.updateStateNewPatient} props={this.props}/>
                            :
                            null}
                    </div>

                    <button onClick={this.handleDelete}>Delete User</button>
                </div>
            </div>
        );
    }
}

export default Doctor;