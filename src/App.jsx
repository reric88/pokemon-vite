import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeList from "./components/PokeList";
import Pagination from "./components/Pagination";
import PokemonCard from "./components/PokemonCard"
import Search from './components/Search'

function App() {
  const pokeURL = "https://pokeapi.co/api/v2/pokemon";
  const pokemonCount = 1010
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(pokeURL);
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [pokemonNames, setPokemonNames] = useState();
  

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







  const pID = () => {
    const urls = [];
    for (let i = 1; i <= pokemonCount; i++) {
      let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
      urls.push(url);
    }
    return urls;
  };
  
  const pokemonList = () => {
    const pokeUrls = pID();
    Promise.all(pokeUrls.map(url => axios.get(url)))
      .then(responses => {
        const pokeNames = responses.map(response => response.data.name);
        setPokemonNames(pokeNames)
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };
  
  // pokemonList();






  




  if (loading) return "Loading...";

  return (
    <>
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
      <Search pokemon={pokemon} pokemonNames={pokemonNames} />
      <PokemonCard pokemon={pokemon} pokeURL={pokeURL} />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage}/>
    </>
  );
}

export default App;
