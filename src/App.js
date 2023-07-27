import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/NavBar/Navbar";

function App() {
  // -------------------------------------------------------
  // 状態定義
  // -------------------------------------------------------
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchInitialPokemonData = async () => {
      await fetchAndUpdate(initialURL);
    };

    fetchInitialPokemonData();
  }, []);

  /**
   * 取得および更新関数
   * @param {*} url
   */
  const fetchAndUpdate = async (url) => {
    setLoading((loading) => true);
    const [allPokemonOverview, displayPokemons] = await fetchPokemonData(url);
    updateEachState(allPokemonOverview, displayPokemons);
  };

  /**
   * ポケモン情報取得用関数
   * @param {*} url
   * @returns
   */
  const fetchPokemonData = async (url) => {
    // 全てのポケモンデータを取得
    const allPokemonOverview = await getAllPokemon(url);

    // 各ポケモンの詳細データを取得
    const displayPokemons = await loadPokemon(allPokemonOverview.results);

    return [allPokemonOverview, displayPokemons];
  };

  /**
   * 状態更新用関数
   * @param {*} allPokemonOverview
   * @param {*} displayPokemons
   */
  const updateEachState = (allPokemonOverview, displayPokemons) => {
    setPokemonData((pokemonData) => displayPokemons);
    setLoading((loading) => false);
    setNextURL((nextURL) => allPokemonOverview.next);
    setPrevURL((prevURL) => allPokemonOverview.previous);
  };

  /**
   * ポケモンの詳細データを取得
   * @param {*} data
   */
  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    return pokemonData;
  };

  const handleNextPage = async () => {
    if (!nextURL) return;
    fetchAndUpdate(nextURL);
  };

  const handlePrevPage = () => {
    if (!prevURL) return;
    fetchAndUpdate(prevURL);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <div>
            <div className="pokemon-card-container">
              {pokemonData.map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
