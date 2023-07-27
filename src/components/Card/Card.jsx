import React from "react";
import "./Card.css";
import CardInfo from "./CardInfo";

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="card-name">{pokemon.name}</h3>
      <div className="card-types">
        <div>タイプ</div>
        {pokemon.types.map((type, pokemon_type_index) => {
          return (
            <div key={pokemon_type_index}>
              <span className="type-name">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <CardInfo param_name={"重さ"} param_val={pokemon.weight} />
      <CardInfo param_name={"高さ"} param_val={pokemon.height} />
      <CardInfo
        param_name={"とくせい"}
        param_val={pokemon.abilities[0].ability.name}
      />
    </div>
  );
};

export default Card;
