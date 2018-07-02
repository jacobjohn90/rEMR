import React, { Component } from 'react';
import NavStyleWrapper from './Styled/NavStyle';
import { withRouter, Link } from 'react-router-dom';

import backImg from '../Images/backButton.svg'

class Nav extends Component {
    state = {
        name: '',
        patient: '',
        visit: '',
    }

    backFc = () => {
        this.props.props.history.goBack()
    }

    render() {

        return (
            <NavStyleWrapper>
                <h1>rEMR</h1>
                <h5>react Electronic Medical Records</h5>
                <div>
                    {this.props.props.match.params.patientId? <img onClick={this.backFc} src={backImg} alt=""/> : null}
                    {this.props.props.match.params.doctorId ? <Link to='/'>Log Out</Link> : null}
                </div>
            </NavStyleWrapper>
        );
    }
}

export default withRouter(Nav);