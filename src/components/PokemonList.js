import React from "react";
import "../component-styles/PokemonList.scss";
import Card from "./Card";

class PokemonList extends React.Component {
  render() {
    const style = {
      textAlign: "center"
    };
    return (
      <>
        <div className="pokedex-screen">
          {this.props.pokemon.length > 0 ? (
            this.props.pokemon.map(pokemon => (
              <Card key={pokemon.id} pokemon={pokemon}></Card>
            ))
          ) : (
            <h1 style={style}>No pokemon found matching that search.</h1>
          )}
        </div>
      </>
    );
  }
}

export default PokemonList;
