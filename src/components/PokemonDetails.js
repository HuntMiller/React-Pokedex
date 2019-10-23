import React from "react";
import axios from "axios";
import Loader from "./Loader";
import { NotificationManager } from "react-notifications";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../component-styles/PokemonDetails.scss";
import TypeBadge from "./TypeBadge.js";

class PokemonDetails extends React.Component {
  state = {
    loading: true,
    pokemon: undefined,
    species: undefined
  };

  componentDidMount() {
    let id = this.props.match.params.id;

    axios
      .all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ])
      .then(
        axios.spread((pokemonRes, speciesRes) => {
          this.setState({
            pokemon: pokemonRes.data,
            species: speciesRes.data
          });
        })
      )
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
    const { pokemon, species } = this.state;
    return this.state.loading ? (
      <Loader></Loader>
    ) : (
      <div className="pokemon-info-container">
        <Carousel infiniteLoop showThumbs={false} width="350px">
          {this.getCarouselSprites(pokemon)}
        </Carousel>
        <h1>{pokemon.name}</h1>
        {this.createDescription(species)}
        {this.createTypes(pokemon)}
        {this.createDetails(pokemon)}

        {/* TODO: Evolutions, stats, weaknesses */}
      </div>
    );
  }

  createDetails(pokemon) {
    return (
      <div className="details-container">
        {this.createDetail("Height", this.convertHeight(pokemon))}
        {this.createDetail("Weight", this.convertWeight(pokemon))}
      </div>
    );
  }

  createDescription(species) {
    return (
      <p>
        {species.flavor_text_entries
          .filter(e => e["language"].name === "en")
          .filter(e => e["version"].name === "y")[0]
          .flavor_text.replace(/[^\w\s.,]/gi, "")}
      </p>
    );
  }

  createTypes(pokemon) {
    let text = "Type";
    if (pokemon.types.length > 1) text += "s";
    return (
      <>
        <h4>{text}</h4>
        <div className="badge-container">{this.getTypeBadges(pokemon)}</div>
      </>
    );
  }

  createDetail(detailName, detail) {
    return (
      <div className="detail-container">
        <h4>{detailName}</h4>
        <p>{detail}</p>
      </div>
    );
  }

  //convert decimeters to feet
  convertHeight({ height }) {
    const feet = height / 3.048;
    const roundFeet = Math.floor(feet);
    const leftOver = feet - roundFeet;
    const inches = (leftOver * 12).toFixed(0);
    return `${roundFeet}' ${inches}"`;
  }

  convertWeight({ weight }) {
    return `${(weight / 4.536).toFixed(2)} lbs`;
  }

  getTypeBadges(pokemon) {
    return pokemon.types.map((item, i) => (
      <TypeBadge key={i} type={item.type.name}></TypeBadge>
    ));
  }

  getCarouselSprites(pokemon) {
    let male = [];
    let female = [];
    let shiny = [];
    let shinyFemale = [];
    let overflow = [];
    Object.keys(pokemon.sprites).map((item, i) => {
      const sprite = pokemon.sprites[item];
      if (sprite) {
        if (item === "front_default" || item === "back_default") {
          male.unshift(this.createCarouselSlide(i, item));
        } else if (item === "front_female" || item === "back_female") {
          female.unshift(this.createCarouselSlide(i, item));
        } else if (item === "front_shiny" || item === "back_shiny") {
          shiny.unshift(this.createCarouselSlide(i, item));
        } else if (
          item === "front_shiny_female" ||
          item === "back_shiny_female"
        ) {
          shinyFemale.unshift(this.createCarouselSlide(i, item));
        } else {
          overflow.unshift(this.createCarouselSlide(i, item));
        }
      }
    });
    const combo = [...male, ...female, ...shiny, ...shinyFemale, ...overflow];
    return combo.length > 0 ? combo : this.createCarouselSlide(this.uuidv4());
  }

  createCarouselSlide(i, item) {
    let text = item ? item.replace(/_/g, " ") : "Unavailable";
    const sprite = this.state.pokemon.sprites[item];
    return (
      <>
        <img
          key={i}
          src={sprite || require("pokemon-sprites/sprites/pokemon/0.png")}
        ></img>
        <p className="legend">{text}</p>
      </>
    );
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export default PokemonDetails;
