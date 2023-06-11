import React, { useEffect } from 'react'

export default function PokemonCard({ pokemon, pokeURL }) {
  return (<>
          {pokemon.map(p=>
          (
            <div className='pokemon-card' key={p.name}>
              <a href={pokeURL + '/' + p.id}>{p.name.toUpperCase().slice(0, 1) + p.name.slice(1)}</a>
              <img src={p.sprites.front_default} />
            </div>
          )
          )}
        </>
  )
}
