import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeList from "./components/PokeList";
import Pagination from "./components/Pagination";
import PokemonCard from "./components/PokemonCard";
import Search from "./components/Search";
import Table from "./components/Table";
import SpriteToggle from "./components/SpriteToggle";
import OGGPlayer from "./components/OGGPlayer";

function App() {
  const pokeURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(pokeURL);
  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [gen, setGen] = useState("8");
  const [bg, setBG] = useState("environment");

  useEffect(() => {
    if (allPokemon.length <= 1280) {
      axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151").then((res) => {
        setAllPokemon(res.data.results);
        const allPkPromise = res.data.results.map((p) => axios.get(p.url));
        Promise.all(allPkPromise).then((res) => {
          const allPkDetails = res.map((p) => p.data);
          setAllPokemonDetails(allPkDetails);
        });
      });
    }
  }, []);

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
        const pkPromise = res.data.results.map((p) => axios.get(p.url));
        Promise.all(pkPromise)
          .then((pokemonData) => {
            const pkDetails = pokemonData.map((p) => p.data);
            setPokemon(pkDetails);
          })
          .catch((err) => {
            console.log("Error fetching details: ", err);
          });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled: ", err.message);
        } else {
          console.log("Error fetching list: ", err);
        }
      });
    return () => {
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

  // if (loading) return "Loading...";

  const getSecondType = (types) => {
    if (types && types.length >= 2) {
      return "/" + types[1].type.name;
    }
    return "";
  };

  const getAbilities = (abilities) => {
    if (abilities && abilities.length === 0) {
      return "";
    } else if (abilities && abilities.length === 1) {
      return (
        abilities[0].ability.name.slice(0, 1).toUpperCase() +
        abilities[0].ability.name.slice(1)
      );
    } else if (abilities && abilities.length >= 2) {
      return (
        abilities[0].ability.name.slice(0, 1).toUpperCase() +
        abilities[0].ability.name.slice(1) +
        " / " +
        abilities[1].ability.name.slice(0, 1).toUpperCase() +
        abilities[1].ability.name.slice(1)
      );
    }
  };

  const search = (data) => {
    return data.filter(
      (p) =>
        // console.log(p)
        p.name.includes(query) ||
        p.id.toString().includes(query) ||
        p.types[0].type.name.includes(query) ||
        getSecondType(p.types).includes(query) ||
        getAbilities(p.abilities).toLowerCase().includes(query)
    );
  };

  console.log("log");
  return (
    <>
      <OGGPlayer />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
      <SpriteToggle setGen={setGen} setBG={setBG} />
      <Search setQuery={setQuery} />
      {/* <Table data={search(allPokemonDetails)} query={query} gen={gen} /> */}
      <PokemonCard pokemon={pokemon} data={search(allPokemonDetails)} query={query} gen={gen} bg={bg} />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
    </>
  );
}

export default App;
