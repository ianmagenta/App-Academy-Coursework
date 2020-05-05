import React from 'react';
import UserContext from './contexts/UserContext';
import App from './App';

class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      authToken: localStorage.getItem('authToken'),
      currentUserId: localStorage.getItem('currentUserId'),
      updateContext: this.updateContext,
    };
  }

  updateContext = (authToken, currentUserId) => {
    this.setState(
      { authToken, currentUserId },
      () => {
        localStorage.setItem('authToken', authToken)
        localStorage.setItem('currentUserId', currentUserId)
      },
    );
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <App currentUserId={this.state.currentUserId} />
      </UserContext.Provider>
    );
  }
}

export default AppWithContext;
