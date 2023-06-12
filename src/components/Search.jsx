import React from 'react'
import { useState } from 'react'
import PokemonCard from './PokemonCard'

export default function Search({ pokemon, pokeURL, pokemonNames }) {

    const [query, setQuery] = useState('')

    // let eachPokemon = pokemon.map(p=>p.name)
    // const cardMap = <PokemonCard pokemon={pokemon} pokeURL={pokeURL} />
    
    // const pokeMap = pokemon.filter(pokemonName=>pokemonName.includes(query)).map((p)=>(
    //     <li key={p.name + '-item'} className="list-item">{p.name}</li>
    // ))

    // const pokeMap = pokemonNames.filter(pName=>pName.includes(query))


    // const eachPokemon = pokemonNames.map(eachName=>eachName)
    // const pokeMap = eachPokemon.filter(pName=>pName.includes(query))

  return (<>
  <div className='search-container'>
    <input type="text" placeholder='Search...' className='search' onChange={e=> setQuery(e.target.value)} />
    <ul className='list'>
    {}
    </ul>
    </div>
    {/* <PokemonCard pokemon={pokemon} pokeURL={pokeURL} /> */}
  </>
  )
}
