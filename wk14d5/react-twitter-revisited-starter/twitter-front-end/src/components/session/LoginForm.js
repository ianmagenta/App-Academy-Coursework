// ./twitter-front-end/src/components/session/LoginForm.js
import React from 'react';
import { apiBaseUrl } from '../../config';
import UserContext from '../../contexts/UserContext'

const LoginFormWithContext = (props) => {
    return (
        <UserContext.Consumer>
            {value => <LoginForm value={value} {...props} updateContext={value.updateContext} />}
        </UserContext.Consumer>
    )
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    update = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBaseUrl}/users/token`, {
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

        this.handleClick();

    };

    handleClick() {
        window.location.href = `/users/${this.state.currentUserId}`
    }

    render() {
        return (
            <form onSubmit={this.loginUser}>
                <h2>Log In</h2>
                <input
                    type="email"
                    value={this.state.email}
                    onChange={this.update}
                    name="email"
                    placeholder="Enter Email"
                />
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.update}
                    name="password"
                    placeholder="Enter Password"
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
};

export default LoginForm;
