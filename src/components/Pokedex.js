import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "../component-styles/Pokedex.scss";
import Header from "./Header.js";
import PokemonList from "./PokemonList.js";
import PokemonDetails from "./PokemonDetails.js";
import Loader from "./Loader.js";

class Pokedex extends React.Component {
  state = {
    loading: true,
    pokemon: [],
    filter: ""
  };

  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000")
      .then(res => {
        this.setState({
          pokemon: this.mapApiResultsIncludeId(res.data.results)
        });
      })
      .catch(e => {
        NotificationManager.error("A problem occurred while loading", "Error");
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    return (
      <Router>
        <Header showFilter onFilter={this.handleFilter}></Header>

        {this.state.loading ? (
          <Loader></Loader>
        ) : (
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <>
                  <PokemonList {...props} pokemon={this.getFilteredPokemon()} />
                </>
              )}
            />
            <Route path="/pokemon/:id" exact component={PokemonDetails} />
          </Switch>
        )}
        <NotificationContainer></NotificationContainer>
      </Router>
    );
  }

  handleFilter = filter => {
    this.setState({ filter });
  };

  getFilteredPokemon() {
    return this.state.pokemon.filter(
      p =>
        p.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
        p.id == this.state.filter
    );
  }

  mapApiResultsIncludeId(pokemonArray) {
    return pokemonArray.map((p, i) => ({
      id: i + 1,
      name: p.name,
      url: p.url
    }));
  }
}

export default Pokedex;
