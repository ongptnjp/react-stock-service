import React from "react";

const Favorite = props => {
  const { faves, onClickSearch } = props

  return (
    <div className="fav">
      <ul>
        <li>
          <p>Favorite</p>
          <ul className="fav-dropdown">
            {faves && faves.map((fav, index) => (
            <li key={index} onClick={() => onClickSearch(fav)}><p>{fav}</p></li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Favorite;