import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import HomePage from './components/HomePage';

class App extends Component {
  state = {
    doctors: []
  }

  componentDidMount(){
    axios.get('/api/doctors').then((res)=> {
      this.setState({doctors: res.data.doctors})
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
