import React from "react";

export default function Search({ setQuery }) {
  return (
    <>
      <div className="search-container">
        <label htmlFor="search-choice" className="search-choice-label">
          <select name="search-choice" id="search-choice">
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="type">Type</option>
            <option value="ability">Ability</option>
          </select>
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </div>
    </>
  );
}
