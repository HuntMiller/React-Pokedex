import React from "react";
import "../component-styles/TypeBadge.scss";

const TypeBadge = props => {
  const { type } = props;

  return <div className={`type-badge type-${type}`}>{type}</div>;
};

export default TypeBadge;
