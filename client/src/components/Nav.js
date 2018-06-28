import React, { Component } from 'react';
import NavStyleWrapper from './Styled/NavStyle'

class Nav extends Component {
    render() {
        return (
            <NavStyleWrapper>
                <h1>rEMR</h1>
                <h5>react Electronic Medical Records</h5>
            </NavStyleWrapper>
        );
    }
}

export default Nav;