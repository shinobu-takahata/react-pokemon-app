export const getAllPokemon = async (url) => {
  return fetch(url).then((res) => res.json());
};

export const getPokemon = async (url) => {
  const pokemon = fetch(url).then((res) => res.json());
  return pokemon;
};
