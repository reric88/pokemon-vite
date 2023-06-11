import React, { useEffect } from 'react'

export default function PokemonList({ pokemon, pokeURL, pokemonURL}) {
  return (<>
        {pokemon.map(p => (
            <div className='pokemon-card' key={p}>
            <a href={pokeURL + '/' + p}><h4>{p[0].toUpperCase() + p.slice(1)}</h4></a>
            </div>
        ))}
        </>
  )
}
