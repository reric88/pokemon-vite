import React from "react";

export default function ExpandHelp() {
  const closeHelpWindow = () => {
    const closeWindow = document.getElementById("help-window");
    // closeWindow.style.left = e.clientX + 'px'
    // closeWindow.style.top = e.clientY + 'px'
    closeWindow.classList.add("go-away");
  };

  return (
    <div className="help-window go-away" id="help-window">
      <div className="close-btn" onClick={closeHelpWindow}>
        ✖
      </div>
      <div className="help-text">
        <ul>
          <li>
            Change the displayed sprites between most generations using the
            "Sprites" menu
          </li>
          <li>
            Change the displayed background in the card window using the
            "Background Type" menu
          </li>
          <li>Begin typing in the search field to search for a Pokemon</li>
          <li>Use "Full" search method to combine all search methods</li>
          <li>
            NOTE: When searching by ID, append your number with a '.' to search
            for that specific number i.e. '63.'
          </li>
        </ul>
      </div>
    </div>
  );
}
