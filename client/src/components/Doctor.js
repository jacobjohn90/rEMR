import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Doctor extends Component {
    

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
                <ul>
                    {patient}
                </ul>
            </div>
        );
    }
}

export default Doctor;