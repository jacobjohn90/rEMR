import React, { Component } from 'react';
import axios from 'axios';
import { Button, green, teal } from './Styled/Buttons';
import { ThemeProvider } from 'styled-components';
import LogInStyle from './Styled/LogInStyle';
import swal from 'sweetalert';
import Nav from './Nav';

class LogIn extends Component {
    state = {
        name: '',
        password: '',
        createShow: false,
        newUser: {
            name: '',
            password: '',
            passwordRepeat: ''
        },

    }

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value

        this.setState({
            [inputName]: userInput
        })
    }
    handleChangeNew = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        const newUser = { ...this.state.newUser }
        newUser[inputName] = userInput
        this.setState({
            newUser
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const currentDoctor = this.props.doctors.find((doctor) => doctor.name === this.state.name)
        if (currentDoctor !== undefined && this.state.password === currentDoctor.password) {
            this.props.history.push(`/${currentDoctor._id}`)
        } else {
            swal('Incorrect Name and/or Password.', 'Try again! New User? Create a new account below')
        }

    }
    handleSubmitNew = (event) => {
        event.preventDefault()
        const newDoc = this.props.doctors.find((doctor) => doctor.name === this.state.newUser.name)
        if (newDoc === undefined && this.state.newUser.password === this.state.newUser.passwordRepeat) {
            axios.post('/api/doctors', this.state.newUser).then((res) => {
                this.props.history.push(`/${res.data._id}`)
            })
        } else if (newDoc !== undefined) {
            swal('Username already taken!', 'Try another name')
        } else if (this.state.newUser.password !== this.state.newPasswordRepeat) {
            swal('Passwords do don\'t match.', 'Try again.')
        }
    }
    changeView = () => {
        let createShow = this.state.createShow
        createShow = !this.state.createShow
        this.setState({
            createShow
        })

    }


    render() {

        return (
            <div>
                <Nav props={this.props}/>
                <LogInStyle>
                    <h2>LogIn</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <ThemeProvider theme={green}>
                            <Button type='submit'>Log In</Button>
                        </ThemeProvider>
                    </form>
                    <br />
                    <ThemeProvider theme={teal}>
                        <Button onClick={this.changeView}>{this.state.createShow ? "Hide Form" : "Add New User"}</Button>
                    </ThemeProvider>
                    <div>
                        {this.state.createShow
                            ?
                            <div>
                                <h2>Create New User</h2>
                                <form onSubmit={this.handleSubmitNew}>
                                    <input placeholder="Name" type="text" name="name" value={this.state.newUser.name} onChange={this.handleChangeNew} required />
                                    <input placeholder="Password" type="password" name="password" value={this.state.newUser.password} onChange={this.handleChangeNew} required />
                                    <input placeholder="Repeat Password" type="password" name="passwordRepeat" value={this.state.passwordRepeat} onChange={this.handleChangeNew} required />
                                    <ThemeProvider theme={teal}>
                                        <Button type='submit'>Create and Login</Button>
                                    </ThemeProvider>
                                </form>
                            </div>
                            : null}
                    </div>
                </LogInStyle>
            </div>
        );
    }
}

export default LogIn;