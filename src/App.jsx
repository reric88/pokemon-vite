import React, { useState, useEffect } from "react";
import axios from "axios";
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
  

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageURL, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageURL(res.data.next);
        setPrevPageURL(res.data.previous);
        const pkPromise = res.data.results.map(p=>axios.get(p.url));
        Promise.all(pkPromise).then((pokemonData)=>{
          const pkDetails = pokemonData.map(p=>p.data);
          setPokemon(pkDetails);
        })
        .catch((err)=>{
          console.log('Error fetching details: ', err)
        });
        })
        .catch((err)=>{
          if (axios.isCancel(err)) {
          console.log('Request canceled: ', err.message)
           } else {
          console.log('Error fetching list: ', err)
           }
        });
        return ()=>{
          cancel();
        };
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
      {/* <PokeList pokemon={pokemon} pokeURL={pokeURL} /> */}
      <PokemonCard pokemon={pokemon} pokeURL={pokeURL} />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
    </>
  );
}

export default App;
