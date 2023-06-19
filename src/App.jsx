import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import PokemonCard from "./components/PokemonCard";
import Search from "./components/Search";
import SpriteToggle from "./components/SpriteToggle";
import OGGPlayer from "./components/OGGPlayer";
import ExpandHelp from "./components/ExpandHelp";
import Graphs from "./components/Graphs";

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
  const [searchMethod, setSearchMethod] = useState("all");
  const [gen, setGen] = useState("8");
  const [bg, setBG] = useState("environment");
  const [scales, setScales] = useState('imperial')
  const [genderF, setGenderF] = useState([]);
  const [genderM, setGenderM] = useState([]);
  const [genderless, setGenderless] = useState([]);
  const [genders, setGenders] = useState([])
  const [graphs, setGraphs] = useState([]);
  const [pkAbility, setPKAbility] = useState([])
  const [compare, setCompare] = useState(false)

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

// useEffect(()=>{
//   axios.get('https://pokeapi.co/api/v2/').then((res)=>{
//     const allPromise = res.data.results.map((p)=> axios.get(p.url))
//     Promise.all(allPromise).then((res)=>{
//       const allDetails = res.map((p)=>p.data)
//       console.log(res)
//     })
//     // axios.get(genderLink).then((res)=>{
//     // })
//   })
// }, []);

  useEffect(() => {
    setLoading(true);
    let cancel;
    
    axios.get('https://pokeapi.co/api/v2/').then((res)=>{
      const dir = res.data
      const ability = dir.ability
      const gender = dir.gender
      axios.get(ability).then((res)=>{
        const abilityLink = (ability + '?limit=' + res.data.count)
      })
      axios.get(gender).then((res)=>{
        const female = res.data.results[0]
        const male = res.data.results[1]
        const genderless = res.data.results[2]
        axios.get(female.url).then((res)=>{
          setGenderF(res.data.pokemon_species_details.map(g=>g.pokemon_species.name))
        })
        axios.get(male.url).then((res)=>{
          setGenderM(res.data.pokemon_species_details.map(g=>g.pokemon_species.name))
        })
        axios.get(genderless.url).then((res)=>{
          setGenderless(res.data.pokemon_species_details.map(g=>g.pokemon_species.name))
        })
        setGenders(genderF, genderM, genderless)
      })
        })

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

  // useEffect(() => {
  //   setLoading(true);
  //   let cancel;
  //   axios
  //     .get(currentPageURL, {
  //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       setNextPageURL(res.data.next);
  //       setPrevPageURL(res.data.previous);
  //       const pkPromise = res.data.results.map((p) => axios.get(p.url));
  //       Promise.all(pkPromise)
  //         .then((pokemonData) => {
  //           const pkDetails = pokemonData.map((p) => p.data);
  //           setPokemon(pkDetails);
  //         })
  //         .catch((err) => {
  //           console.log("Error fetching details: ", err);
  //         });
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) {
  //         console.log("Request canceled: ", err.message);
  //       } else {
  //         console.log("Error fetching list: ", err);
  //       }
  //     });
  //   return () => {
  //     cancel();
  //   };
  // }, [currentPageURL]);

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
    if (searchMethod === "name") {
      return data.filter((p) => p.name.includes(query.trim()));
    } else if (searchMethod === "id") {
      if (query.endsWith('.')){
        return data.filter((p)=> p.id.toString() === query.slice(0, -1))
      } else {
        return data.filter((p) => p.id.toString().includes(query));
      }
    } else if (searchMethod === "type") {
      return data.filter(
        (p) =>
          p.types[0].type.name.includes(query) ||
          getSecondType(p.types).includes(query)
      )
    } else if (searchMethod === "ability") {
      return data.filter((p) =>
        getAbilities(p.abilities).toLowerCase().includes(query)
      );
    // } else if (searchMethod === "all") {
    } else if  (searchMethod === 'all' && !query.endsWith('.')){
      return data.filter(
        (p) =>
          p.name.includes(query.trim()) ||
          p.id.toString().includes(query) ||
          p.types[0].type.name.includes(query) ||
          getSecondType(p.types).includes(query) ||
          getAbilities(p.abilities).toLowerCase().includes(query)
      );
    } else if (searchMethod === 'all' && query.endsWith('.')){
      return data.filter((p)=> p.id.toString() === query.slice(0, -1))

    }
    };

  return (
    <>
    {/* {console.log()} */}
    <ExpandHelp />
      <OGGPlayer />
      {/* <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} /> */}
      <SpriteToggle setGen={setGen} setBG={setBG} />
      <Search setQuery={setQuery} setSearchMethod={setSearchMethod} searchMethod={searchMethod} setScales={setScales} />
      <PokemonCard
        pokemon={pokemon}
        data={search(allPokemonDetails)}
        query={query}
        gen={gen}
        bg={bg}
        scales={scales}
        genderM={genderM}
        genderF={genderF}
        genderless={genderless}
      />
      <Pagination goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} />
    </>
  );
}

export default App;
