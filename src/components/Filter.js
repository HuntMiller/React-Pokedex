import React, { Component } from "react";
import "../component-styles/Filter.scss";

class Filter extends Component {
  state = { filter: "" };

  handleFilter = e => {
    e.preventDefault();
    this.props.onFilter(this.state.filter);
  };

  render() {
    return (
      <form onSubmit={this.handleFilter} className="filter-form">
        <input
          className="filter-input"
          placeholder="Search Pokemon"
          value={this.state.filter}
          onChange={e => this.setState({ filter: e.target.value })}
        ></input>
      </form>
    );
  }
}

export default Filter;
