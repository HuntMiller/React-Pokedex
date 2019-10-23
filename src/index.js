import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Pokedex from "./components/Pokedex.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Pokedex />, document.getElementById("root"));

serviceWorker.unregister();
