import React, { useState } from 'react'

export default function SpriteToggle({ setGen, setBG }) {
        let choice = document.getElementById('sprite-select')
        let options = document.querySelectorAll('option')

const changeSprite = (e) => {
    setGen(e.target.value)
}

const changeBG = (e) => {
    setBG(e.target.value)
}




  return (
    <>
        <div className='sprite-toggle-div'>
            <label id='sprites-label' htmlFor="sprite-select"><span>Sprites</span>
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
            <label id='bg-label' htmlFor="bg-toggle"><span>Background Type</span>
                <select name="bg-select" id="bg-select" defaultValue='environment' onChange={changeBG}>
                    <option value="environment">Environment</option>
                    <option value="color">Color</option>
                    <option value="black">Dark</option>
                    <option value="white">Light</option>
                </select>
            </label>
        </div>
        
    </>
  )
}
