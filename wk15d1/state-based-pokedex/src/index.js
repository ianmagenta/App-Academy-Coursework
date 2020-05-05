import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const queryApi = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
  const data = await res.json();
  // this.setState({ bulbasaur: data, url: data.sprites.front_default });
  // console.log(data);
  return data;
};

ReactDOM.render(
  <React.StrictMode>
    <App data={queryApi()} />
  </React.StrictMode>,
  document.getElementById("root")
);
