import React, { Component } from 'react';
import NavStyleWrapper from './Styled/NavStyle';
import { withRouter, matchPath } from 'react-router-dom';

class Nav extends Component {
    state = {
        name: '',
        patient: '',
        visit: '',
    }
    
    match1 = matchPath(this.props.history.location.pathname, {
        path: '/:doctorId',
        exact: true,
        strict: false
    })
    match2 = matchPath(this.props.history.location.pathname, {
        path: '/:doctorId/:patientId',
        exact: true,
        strict: false
    })
    match3 = matchPath(this.props.history.location.pathname, {
        path: '/:doctorId/:patientId/:visitId',
        exact: true,
        strict: false
    })
    // method for match1, match2, and match3 were found in stackoverflow to retreive params

        

    render() {
        if (this.props === undefined) {
            return null
        }
        if (this.match2 !== null) {
            const currentDoctor = this.props.doctors.find((doctor) => doctor._id === this.match2.params.doctorId)
            if (currentDoctor !== undefined) {
                const currentPatient = currentDoctor.patients.find((patient)=> patient._id === this.match2.params.patientId)
                console.log('succeeded')
                console.log(currentDoctor)
            }
        }
        return (
            <NavStyleWrapper>
                <h1>rEMR</h1>
                <h5>react Electronic Medical Records</h5>
            </NavStyleWrapper>
        );
    }
}

export default withRouter(Nav);