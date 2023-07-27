import React from "react";
import "./Card.css";

function CardInfo({ param_name, param_val }) {
  return (
    <div className="card-info">
      <div className="card-data">
        <p className="title">
          {param_name}：{param_val}
        </p>
      </div>
    </div>
  );
}

export default CardInfo;
