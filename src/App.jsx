import React, { useState, useEffect } from "react";
import axios from "../node_modules/axios";
import PokeList from "./components/PokeList";
import Pagination from "./components/Pagination";
import PokemonCard from "./components/PokemonCard"

function App() {
  const pokeURL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(pokeURL);
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [url, setURL] = useState();
  

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageURL
      )
      .then((res) => {
        setLoading(false);
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
        setURL(res.data.results.map(u=>u.url));
        });
        
        
      }, [currentPageURL]);


  function goToNextPage() {
    if (nextPageURL != null) {
      setCurrentPageURL(nextPageURL);
    }
  }

  function goToPrevPage() {
    if (prevPageURL != null) {
      setCurrentPageURL(prevPageURL);
    }
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokeList pokemon={pokemon} pokeURL={pokeURL} />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
    </>
  );
}

export default App;
