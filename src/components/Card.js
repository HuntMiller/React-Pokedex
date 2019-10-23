import React from "react";
import { Link } from "react-router-dom";
import "../component-styles/Card.scss";

const Card = props => {
  const { pokemon } = props;

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="pokemon-card"
      aria-label={getNameLabel(pokemon)}
    >
      <img
        className="pokemon-image"
        src={getSrc(pokemon)}
        alt={getAltText(pokemon)}
      ></img>
      <p>{getNameLabel(pokemon)}</p>
    </Link>
  );

  function getNameLabel({ id, name }) {
    return `#${id} ${name}`;
  }

  function getAltText({ name }) {
    return `Icon of ${name}`;
  }

  function getSrc({ id }) {
    let src;
    try {
      src = require(`pokemon-sprites/sprites/pokemon/${id}.png`);
    } catch (e) {
      src = require("pokemon-sprites/sprites/pokemon/0.png");
    }
    return src;
  }
};

export default Card;
