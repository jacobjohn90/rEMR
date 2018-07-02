import React, { Component } from 'react';
import NavStyleWrapper from './Styled/NavStyle';
import { withRouter, Link } from 'react-router-dom';

class Nav extends Component {
    state = {
        name: '',
        patient: '',
        visit: '',
    }


    render() {

        return (
            <NavStyleWrapper>
                <h1>rEMR</h1>
                <h5>react Electronic Medical Records</h5>
                <div>
                    {/* {this.props.props.match.params.doctorId ? } */}
                    {this.props.props.match.params.doctorId ? <Link to='/'>Log Out</Link> : null}
                </div>
            </NavStyleWrapper>
        );
    }
}

export default withRouter(Nav);