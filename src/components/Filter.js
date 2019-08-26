import React from 'react';
import './Filter.sass'

const FilterCheck = (props) => {
    return (
        <div className="filterCheck">
            <button style={props.display === "all" ? { border: "1px solid red" } : { border: "1px solid black" }} onClick={props.handleAllClick}>All</button>
            <button style={props.display === "favorite" ? { border: "1px solid red" } : { border: "1px solid black" }} onClick={props.handleFavClick}>Favorites</button>
        </div>
    );
}

export default FilterCheck;