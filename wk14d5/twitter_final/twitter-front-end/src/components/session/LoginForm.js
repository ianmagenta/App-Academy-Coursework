import React from "react";
import UserContext from '../../contexts/UserContext';
import { apiBaseUrl } from '../../config';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      authToken: null,
      currentUserId: null,
    };
  }

  loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await fetch(`${apiBaseUrl}/users/token`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw res;

      const {
        token,
        user: { id },
      } = await res.json();

      this.setState(
        { authToken: token, currentUserId: id },
        () => {
          const { authToken, currentUserId } = this.state;
          this.props.updateContext(authToken, currentUserId);
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form onSubmit={this.loginUser}>
        <h2>Log In</h2>
        <input
          type="email"
          value={email}
          onChange={this.update}
          name="email"
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={password}
          onChange={this.update}
          name="password"
          placeholder="Enter Password"
        />

        <button type="submit">Log In</button>
      </form>
    )  
  }
}

const LoginFormWithContext = (props) => {
  return (
    <UserContext.Consumer>
      {value => <LoginForm {...props} updateContext={value.updateContext} />}
    </UserContext.Consumer>
  );
}

export default LoginFormWithContext;

