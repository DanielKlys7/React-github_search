import React from 'react';
import './UserList.sass'
import User from '../User/User'

const displayUsers = (props) => {
    if (props.display === "all") {
        return (
            props.users
                .map(user => (
                    <User
                        handleDeleteClick={props.handleDeleteClick}
                        handleFavoriteClick={props.handleFavoriteClick}
                        user={user}
                        key={user.id} />))
        )
    } else {
        return (
            props.users
                .filter(user => user.favorite)
                .map(user => (
                    <User
                        handleDeleteClick={props.handleDeleteClick}
                        handleFavoriteClick={props.handleFavoriteClick}
                        user={user}
                        key={user.id} />))
        )

    }

}

const UserList = (props) => {
    return (
        <div className="wrapper">
            {displayUsers(props)}
        </div>
    );
}

export default UserList;