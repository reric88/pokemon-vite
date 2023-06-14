import React from 'react'

export default function Search({ setQuery}) {

  return (<>
  <div className='search-container'>
    <input id='search' type="text" placeholder='Search...' className='search' onChange={e=> setQuery(e.target.value.toLowerCase())} />
    </div>
  </>
  )
}
