import React from "react";
import ExpandHelp from "./ExpandHelp";

export default function Search({ setQuery, setSearchMethod, searchMethod, setScales }) {


  
  const getSearch = (e) => {
    const searchbar = document.getElementById('search')
      if (e.key === 'Enter'){
        setQuery(searchbar.value.toLowerCase())
      }
  }


const changeMethod = (e) => {
  setSearchMethod(e.target.value)
}

const changeScales = (e) => {
  setScales(e.target.value)
}

const queryMethod =  (e) => {
  if (searchMethod === 'name'){
    setQuery(e.target.value.toLowerCase())
  }
}

const expandHelp = () => {
        const closeWindow = document.getElementById('help-window');
          closeWindow.classList.remove('go-away')

}


  return (
    <>
      <div className="search-container">
      <div id="search-help" onClick={expandHelp}>
        ❔
      </div>
        <input
          id="search"
          type="text"
          placeholder="Search by..."
          className="search"
          // onChange={(e) => setQuery(e.target.value.toLowerCase())}
          onKeyDown={getSearch}
        />
        <label htmlFor="search-choice" className="search-choice-label">
          <select name="search-choice" id="search-choice" onChange={(e)=>changeMethod(e)} defaultValue='all'>
            <option value="all">Full</option>
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="type">Type</option>
            <option value="ability">Ability</option>
          </select>
        </label>
      <div className='scale-container'>
      <select name="set-scales" id="set-scales" onChange={(e)=>changeScales(e)} defaultValue={'imperial'}>
        <option value="imperial">Imperial</option>
        <option value="metric">Metric</option>
      </select>
      </div>
      </div>
    </>
  );
}
