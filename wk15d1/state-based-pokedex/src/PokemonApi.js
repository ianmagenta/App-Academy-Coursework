import React from "react";

class PokemonApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bulbasaur: "",
      url: "?",
    };
  }

  render() {
    return (
      <>
        {/* <button onClick={this.queryApi}>Click Me</button> */}
        <p>Name: {this.props.name}</p>
        {/* <p>Height: {this.state.bulbasaur.height} inches</p>
        <p>Weight: {this.state.bulbasaur.weight} lbs</p>
        <img src={this.props.} alt="bulba" /> */}
      </>
    );
  }
}

export default PokemonApi;
