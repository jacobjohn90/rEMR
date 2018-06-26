import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import LogIn from './components/LogIn';
import Doctor from './components/Doctor';

class App extends Component {
  state = {
    doctors: []
  }

  componentDidMount() {
    axios.get('/api/doctors').then((res) => {
      this.setState({ doctors: res.data.doctors })
    })
  }

  render() {

    const LogInComponent = (props) => (
      <LogIn doctors={this.state.doctors} {...props} />
    )
    const DoctorComponent = (props) => (
      <Doctor doctors={this.state.doctors} {...props} />
    )

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={LogInComponent} />
          <Route exact path='/:doctorId' render={DoctorComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
