import React, { Component } from 'react';
import axios from 'axios';

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
            alert('Incorrect Name and/or Password. New User? Create a new account below')
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
            alert('Username already taken. Try another name')
        } else if (this.state.newUser.password !== this.state.newPasswordRepeat) {
            alert('Passwords do don\'t match. Try again.')
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
                <h1>LogIn</h1>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button type='submit'>Log In</button>
                </form>
                <br />
                <button onClick={this.changeView}>{this.state.createShow ? "Hide Form" : "Add New User"}</button>
                <div>
                    {this.state.createShow
                        ?
                        <div>
                            <h2>Create New User</h2>
                            <form onSubmit={this.handleSubmitNew}>
                                <input placeholder="Name" type="text" name="name" value={this.state.newUser.name} onChange={this.handleChangeNew} />
                                <input placeholder="Password" type="password" name="password" value={this.state.newUser.password} onChange={this.handleChangeNew} />
                                <input placeholder="Repeat Password" type="password" name="passwordRepeat" value={this.state.passwordRepeat} onChange={this.handleChangeNew} />
                                <button type='submit'>Create and Login</button>
                            </form>
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

export default LogIn;