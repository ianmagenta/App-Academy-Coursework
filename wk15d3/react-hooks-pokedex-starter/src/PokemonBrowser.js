import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { imageUrl } from "./config";
import PokemonDetail from "./PokemonDetail";

const PokemonBrowser = (props) => {
  if (!props.pokemon) {
    return null;
  }
  return (
    <main>
      <nav>
        {props.pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className="nav-entry">
                <div
                  className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`,
                  }}
                ></div>
                <h1>{pokemon.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route
        path="/pokemon/:id"
        render={(props) => <PokemonDetail {...props} token={props.token} />}
      />
    </main>
  );
};

export default PokemonBrowser;
