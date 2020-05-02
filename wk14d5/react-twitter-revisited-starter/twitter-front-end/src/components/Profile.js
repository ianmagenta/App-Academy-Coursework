// ./twitter-front-end/src/components/Profile.js
import React from "react";
import { apiBaseUrl } from '../config';
import UserContext from '../contexts/UserContext'


const ProfileWithContext = (props) => {
    return (
        <UserContext.Consumer>
            {value => <Profile value={value} {...props} updateContext={value.updateContext} />}
        </UserContext.Consumer>
    )
}
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
        }
    }

    async componentDidMount() {
        this.fetchTweets();
    }

    async fetchTweets() {
        console.log("You are now trying to get tweets");
        try {
            const res = await fetch(`${apiBaseUrl}/tweets`, {
                headers: {
                    Authorization: `Bearer ${this.props.authToken}`,
                },
            });
            if (!res.ok) {
                throw res;
            }
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <h1>Profile Page</h1>
        );
    }
};

export default Profile;
