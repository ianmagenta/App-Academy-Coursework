import React from "react";

import PokemonApi from "./PokemonApi";

function App(props) {
  return <PokemonApi api={props.data} />;
}

export default App;
