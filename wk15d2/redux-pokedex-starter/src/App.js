import { connect } from "react-redux";

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoginPanel from "./LoginPanel";
import PokemonBrowser from "./PokemonBrowser";
import { loadToken } from "./store/authentication";

const PrivateRoute = ({ component: Component, cProps, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin === true ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} {...cProps} />
      )
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      token: this.props.token,
      needLogin: true,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.props.loadToken();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const cProps = {
      token: this.props.token,
    };
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPanel} /> />
          <PrivateRoute
            path="/"
            exact={true}
            needLogin={this.props.needLogin}
            component={PokemonBrowser}
            cProps={cProps}
          />
          <PrivateRoute
            path="/pokemon/:pokemonId"
            exact={true}
            needLogin={this.props.needLogin}
            component={PokemonBrowser}
            cProps={cProps}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    needLogin: state.authentication.token ? false : true,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
