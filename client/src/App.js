import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import LogIn from './components/LogIn';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Visit from './components/Visit';
import Nav from './components/Nav';

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
    const PatientComponent = (props) => (
      <Patient doctors={this.state.doctors}{...props} />
    )
    const VisitComponent = (props) => (
      <Visit doctors={this.state.doctors} {...props} />
    )

    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path='/' render={LogInComponent} />
            <Route exact path='/:doctorId' render={DoctorComponent} />
            <Route exact path='/:doctorId/:patientId' render={PatientComponent} />
            <Route exact path='/:doctorId/:patientId/:visitId' render={VisitComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
