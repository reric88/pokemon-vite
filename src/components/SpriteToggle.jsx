import React, { useState } from 'react'

export default function SpriteToggle({ setGen, setPGen, gen, pGen, pokemon }) {
        let choice = document.getElementById('sprite-select')
        let options = document.querySelectorAll('option')

// const changeSprite = () => {
//     let choice = document.getElementById('#sprite-select')
//     let options = document.querySelectorAll('option')
//     for (i=0; i<options.length; i++){
//         if (options[i].contains())
//     }
// }

const changeSprite = (e) => {
    setGen(e.target.value)
    // setPGen(genValue(gen))
}

// const genValue = (num) => {

//     let generations = []

//     pokemon.map(p=>(
//     generations = [p.sprites.versions['generation-i']['red-blue']['front_default'], p.sprites.versions['generation-ii']['crystal']['front_default'], p.sprites.versions['generation-iii']['emerald']['front_default'], p.sprites.versions['generation-iv']['platinum']['front_default'], p.sprites.versions['generation-v']['black-white']['front_default'], p.sprites.versions['generation-v']['black-white']['animated']['front_default'], p.sprites.versions['generation-vi']['omegaruby-alphasapphire']['front_default'], p.sprites.versions['generation-vii']['ultra-sun-ultra-moon']['front_default']]
//     ))
//         return generations[num]
//   }

  return (
    <>
        <div className='sprite-toggle-div'>
            <label htmlFor="sprite-select">
                <select name="sprite-select" id="sprite-select" onChange={changeSprite} defaultValue='8'>
                    <option value="0">Gen 1: Red, Blue, Yellow</option>
                    <option value="1">Gen 2: Crystal, Gold, Silver</option>
                    <option value="2">Gen 3: Emerald, Fire-Red, Leaf-Green, Ruby, Sapphire</option>
                    <option value="3">Gen 4: Diamond, Pearl, Heart-Gold, Soul-Silver, Platinum</option>
                    <option value="4">Gen 5: Black, White</option>
                    <option value="5">Gen 5: Animated</option>
                    <option value="6">Gen 6: Omega-Ruby, Alpha Sapphire, X, Y</option>
                    <option value="7">Gen 7: Ultra-Sun, Ultra-Moon</option>
                    <option value="8">Default Sprites</option>
                </select>
            </label>
        </div>
        {/* {console.log(gen)} */}
        
    </>
  )
}
