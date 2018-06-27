import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Doctor extends Component {
    
    state = {
        editView: false
    }

    handleDelete = () => {
        const doctorId = this.props.match.params.doctorId
        axios.delete(`/api/doctors/${doctorId}`).then((res)=>{
            this.props.history.push('/')
            console.log(res.data)
        })
    }
    handleEdit= () => {
        let editView = this.state.editView
        editView = !this.state.editView
        this.setState({
            editView
        })

    }

    render() {
        const currentDoctor = this.props.doctors.find((doctor)=> doctor._id === this.props.match.params.doctorId)

        if (currentDoctor === undefined) {
            return null
        }
        const patient = currentDoctor.patients.map((patient, i)=> {
            return (
                <li key={i}>
                    <Link to={`/${currentDoctor._id}/${patient._id}`}>{patient.name}</Link>
                </li>
            )
        })

        return (
            <div>
                <h1>Welcome {currentDoctor.name}</h1>
                <h3>Your current Patient List is:</h3>
                <form action="">
                </form>
                <ul>
                    {patient}
                </ul>
                <button onClick={this.handleEdit}>Edit User Info</button>
                <button onClick={this.handleDelete}>Delete User</button>
            </div>
        );
    }
}

export default Doctor;