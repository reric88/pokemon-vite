import React, { useEffect } from 'react'

export default function PokemonCard({ pokemon, pokeURL }) {

  const getSecondType = (types) => {
    if (types && types.length >=2){
      return '/' + types[1].type.name;
    }
    return '';
  };

  const getTypeIcon = (icon) => {
    return '../../public/pokeicons/' + icon +'.png'
  }

  const getCardColor = (type) => {
    if (type === 'bug') {
      return '#90C12C'
    } 
    else if (type === 'dark'){
      return '#5A5366'
    } 
    else if (type === 'dragon'){
      return '#096DC4'
    } 
    else if (type === 'electric'){
      return '#F3D23B'
    } 
    else if (type === 'fairy'){
      return '#EC8FE6'
    } 
    else if (type === 'fighting'){
      return '#CE4069'
    } 
    else if (type === 'fire'){
      return '#FF9C54'
    } 
    else if (type === 'flying'){
      return '#92AADE'
    } 
    else if (type === 'ghost'){
      return '#5269AC'
    } 
    else if (type === 'grass'){
      return '#63BB5B'
    } 
    else if (type === 'ground'){
      return '#D97746'
    } 
    else if (type === 'ice'){
      return '#74CEC0'
    } 
    else if (type === 'normal'){
      return '#9099A1'
    } 
    else if (type === 'poison'){
      return '#AB6AC8'
    } 
    else if (type === 'psychic'){
      return '#F97176'
    } 
    else if (type === 'rock'){
      return '#C7B78B'
    } 
    else if (type === 'steel'){
      return '#5A8EA1'
    } 
    else if (type === 'water'){
      return '#4D90D5'
    } else {
      return '#888'
   }
  }

  return (<>
          {pokemon.map(p=>
          (
            <div className='pokemon-card' style={{backgroundColor: getCardColor(p.types[0].type.name)}}  key={p.name}>
              <h4 className='pokemon-name'>{p.name.toUpperCase().slice(0, 1) + p.name.slice(1)}</h4>
              {/* <h4 className='pokemon-type'>{p.types[0].type.name.toUpperCase().slice(0,1) + p.types[0].type.name.slice(1) + getSecondType(p.types).toUpperCase().slice(0, 2) + getSecondType(p.types).slice(2)}</h4> */}
              <div className='pokemon-types'>
              <img width='16' height='16' src={getTypeIcon(p.types[0].type.name)} />
              <img width='16' height='16' src={getTypeIcon(getSecondType(p.types))} />
              </div>
              <img src={p.sprites.front_default} />
            </div>
          )
          )}
        </>
  )
}
