import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faTimes, faStar);

const User = ({ user, handleDeleteClick, handleFavoriteClick }) => {
    return (
        <div className="singleUser" id={user.id}>
            <div className="img">
                <img src={user.avatar_url} alt="profilepic" />
            </div>
            <div className="information">
                <h1>{user.name}</h1>
                <p className="login"><a href={user.html_url} target="_blank" rel="noopener noreferrer">@{user.login}</a></p>
                {user.company ? <p>{user.company}</p> : null}
            </div>
            <div className="buttons">
                <button onClick={handleFavoriteClick} id={user.id}><FontAwesomeIcon style={user.favorite ? { color: "gold" } : {}} id={user.id} icon="star" /></button>
                <button id={user.id} onClick={handleDeleteClick}><FontAwesomeIcon id={user.id} icon="times" /></button>
            </div>
        </div>
    );
}

export default User;