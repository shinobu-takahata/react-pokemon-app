import React from "react";
import "./Card.css";

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
      <div className="card-info">
        <div className="card-data">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
      </div>
      <div className="card-info">
        <div className="card-data">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
      </div>
      <div className="card-info">
        <div className="card-data">
          <p className="title">とくせい：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
