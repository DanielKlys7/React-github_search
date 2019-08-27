import React from 'react';
import './Filter.sass'

const FilterCheck = (props) => {
    return (
        <div className="filterCheck">
            <button className={props.display === "all" ? "selected" : "notSelected"} onClick={props.handleAllClick}>All</button>
            <button className={props.display === "favorite" ? "selected" : "notSelected"} onClick={props.handleFavClick}>Favorites</button>
        </div>
    );
}

export default FilterCheck;