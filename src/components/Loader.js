import React from "react";
import "../component-styles/Loader.scss";

const Loader = props => {
  const balls = [
    "poke",
    "premier",
    "great",
    "ultra",
    "master",
    "beast",
    "dive",
    "dusk",
    "fast",
    "friend",
    "heal",
    "heavy",
    "level",
    "love",
    "lure",
    "luxury",
    "moon",
    "nest",
    "net",
    "quick",
    "repeat",
    "timer",
    "cherish",
    "dream",
    "park",
    "iron",
    "smoke",
    "light"
  ];

  let src1 = require(`pokemon-sprites/sprites/items/${getBall()}-ball.png`);
  let src2 = require(`pokemon-sprites/sprites/items/${getBall()}-ball.png`);
  let src3 = require(`pokemon-sprites/sprites/items/${getBall()}-ball.png`);

  return (
    <div className="loader">
      <img src={src1} alt=""></img>
      <img src={src2} alt=""></img>
      <img src={src3} alt=""></img>
    </div>
  );

  function getBall() {
    return balls[Math.floor(Math.random() * balls.length)];
  }
};

export default Loader;
