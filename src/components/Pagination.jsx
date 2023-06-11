import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div className='btn-div'>
        {goToPrevPage && 
        <button className="btn btn-primary btn-lg" onClick={goToPrevPage}>Previous</button>
        }
        {goToNextPage && 
        <button className="btn btn-primary btn-lg" onClick={goToNextPage}>Next</button>
        }
    </div>
  )
}
