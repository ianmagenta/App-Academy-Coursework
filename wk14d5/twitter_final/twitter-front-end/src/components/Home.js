import React from "react";
import UserContext from '../contexts/UserContext';
import { apiBaseUrl } from '../config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  fetchTweets = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/tweets`, {
        headers: {
          Authorization: `Bearer ${this.props.authToken}`,
        },
      });

      if (!res.ok) throw res;
      const { tweets } = await res.json();
      return tweets;
    } catch(err) {
      console.error(err);
      return [];
    }
  }

  async componentDidMount() {
    const tweets = await this.fetchTweets();
    this.setState({ tweets });
  }

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          {tweets.map((tweet) => {
            const { id, message, user: { username }} = tweet;
            return (
              <li key={id}>
                <h3>{username}</h3>
                <p>{message}</p>
              </li>
          )})}
        </ul>
      </div>
    );
  }
};

const HomeWithContext = (props) => {
  return (
    <UserContext.Consumer>
      {value => <Home {...props} authToken={value.authToken} />}
    </UserContext.Consumer>
  );
}

export default HomeWithContext;
