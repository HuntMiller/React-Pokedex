import React from "react";
import { Link } from "react-router-dom";
import "../component-styles/Header.scss";
import Filter from "./Filter";

const Header = props => {
  return (
    <>
      <header>
        <Link to="/">
          <img
            src={require("pokemon-sprites/sprites/items/poke-ball.png")}
            alt="Pokeball"
          ></img>
          Pokédex
        </Link>
        {props.showFilter && (
          <Filter onFilter={filter => props.onFilter(filter)}></Filter>
        )}
      </header>
      <div className="header-pad"></div>
    </>
  );
};

export default Header;
