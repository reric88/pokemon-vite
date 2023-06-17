import React from 'react'

export default function ExpandHelp() {

    const closeHelpWindow = (e) => {
        const closeWindow = document.getElementById('help-window');
        // closeWindow.style.left = e.clientX + 'px'
        // closeWindow.style.top = e.clientY + 'px'
        closeWindow.classList.add('go-away')
    }

  return (
    <div className='help-window' id='help-window'>
        <div className="close-btn" onClick={closeHelpWindow}>✖</div>
        <div className="help-text">
            <ul>
                <li>Change the displayed sprites between most generations using the "Sprites" menu</li>
                <li>Change the displayed background in the card window using the "Background Type" menu</li>
                <li>Begin typing in the search field to search for a Pokemon</li><li>Use "Full" to combine all search methods</li>
                        <li>Use "Name" to only search by name</li>
                        <li>Use "ID" to only search by ID</li>
                        <li>Use "Type" to only search by type. Primary and secondary types are included in the search</li>
                        <li>Use "Ability" to only search by ability</li>
                        <li>NOTE: When search by ID, append your number with a '.' to search for that specific number i.e. '63.'</li>
            </ul>
        </div>
    </div>
  )
}
