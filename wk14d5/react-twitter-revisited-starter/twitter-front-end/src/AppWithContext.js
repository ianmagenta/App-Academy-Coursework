import React from "react";
import UserContext from "./contexts/UserContext"
import App from "./App"

class AppWithContext extends React.Component {
    constructor() {
        super();
        this.state = {
            authToken: null,
            currentUserId: null,
            updateContext: this.updateContext,
        }
    }

    updateContext = (authToken, currentUserId) => {
        this.setState(
            { authToken, currentUserId },
            () => console.log(this.state)
        );
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <App props={this.state.currentUserId} />
            </UserContext.Provider>
        );
    }
}

export default AppWithContext;
