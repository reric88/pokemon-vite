import React, { useEffect } from 'react'

export default function PokemonCard({ pokemon, pokeURL }) {

  const getSecondAbility = (abilities) => {
    if (abilities && abilities.length >= 2){
      return abilities[1].ability.name
    }
    return  '';
  }

  const getSecondType = (types) => {
    if (types && types.length >=2){
      return '/pokemon-vite/' + types[1].type.name;
    }
    return '';
  };

  const getTypeIcon = (icon) => {
    return icon +'.png'
  }

  const getSecondTypeIcon = (types) => {
    if (types && types.length >=2){
      return <img width='16' height='16' src={getTypeIcon(getSecondType(types))} />
    }
    return '';
  }

  const newGetSecondTypeIcon = (types) => {
    if (types && types.length >=2){
      let secondType = getSecondType(types)
      let secondIcon = getTypeIcon(secondType)
      return <img width='16' height='16' src={secondIcon} />
    }
    return '';
  }
// #region Get Card Color

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

  // #endregion


  
  return (<>
          {pokemon.map(p=>
          (
            <div className='pokemon-card' style={{backgroundColor: getCardColor(p.types[0].type.name)}}  key={p.name}>
            <div className='name-and-type'>
              <h4 className='pokemon-name'>{p.name.toUpperCase().slice(0, 1) + p.name.slice(1)}</h4>
              <div className='pokemon-type'>
              <img width='16' height='16' src={getTypeIcon(p.types[0].type.name)} />
              {newGetSecondTypeIcon(p.types)}
              </div>
              </div>
              <img className='pokemon-pic' src={p.sprites.front_default} style={{backgroundImage: 'url('+ p.types[0].type.name +'bg.png)'}}/>
              <div className='front-info'>
                <div className='pokemon-abilities'>
              <label>Abilities</label>
                <h5>{p.abilities[0].ability.name.toUpperCase().slice(0, 1) + p.abilities[0].ability.name.slice(1)}</h5>
                <h5>{getSecondAbility(p.abilities).toUpperCase().slice(0, 1) + getSecondAbility(p.abilities).slice(1)}</h5>
                </div>
              </div>
            </div>
          )
          )}
        </>
  )
}
