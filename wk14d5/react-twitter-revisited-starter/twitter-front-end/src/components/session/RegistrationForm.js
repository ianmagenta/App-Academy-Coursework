// ./twitter-front-end/src/components/session/RegistrationForm.js

import React from 'react';
import { apiBaseUrl } from '../../config';
import UserContext from '../../contexts/UserContext'

const RegistrationFormWithContext = (props) => {
    return (
        <UserContext.Consumer>
            {value => <RegistrationForm value={value} {...props} updateContext={value.updateContext} />}
        </UserContext.Consumer>
    )
}


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            authToken: "",
            currentUserId: "",
        }
    }

    updateUsername = (e) => {
        this.setState({ username: e.target.value });
    }
    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    }
    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBaseUrl}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.props.authToken}`,
                },
                body: JSON.stringify(this.state)
            });
            if (!res.ok) {
                throw res;
            }
            const { token, user } = await res.json();
            this.setState({ authToken: token, currentUserId: user.id }, this.props.updateContext(this.state.authToken, this.state.currentUserId));

        } catch (err) {
            console.log(err)
        }

    }

    handleClick() {
        window.location.href = "/"
    }

    render() {
        return (
            <form onSubmit={this.registerUser}>
                <h2>Register</h2>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.updateUsername}
                    name="username"
                    placeholder="Enter Username"
                />
                <input
                    type="email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                    name="email"
                    placeholder="Enter Email"
                />
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.updatePassword}
                    name="password"
                    placeholder="Enter Password"
                />
                <button type="submit" onClick={this.handleClick}>Submit</button>
            </form>
        )
    }
}



export default RegistrationFormWithContext;
