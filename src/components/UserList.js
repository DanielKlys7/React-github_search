import React from 'react';
import './UserList.sass'
import User from './User'



const UserList = (props) => {

    // const displayUsers = props.users.map(user => (
    //     <User handleDeleteClick={props.handleDeleteClick} handleFavoriteClick={props.handleFavoriteClick} user={user} />
    // ))


    let users = props.users;
    if (props.display === "all") {
        users = users.map(user => <User handleDeleteClick={props.handleDeleteClick} handleFavoriteClick={props.handleFavoriteClick} user={user} />)
    } else if (props.display === "favorite") {
        users = users.filter(user => user.favorite);
        users = users.map(user => <User handleDeleteClick={props.handleDeleteClick} handleFavoriteClick={props.handleFavoriteClick} user={user} />)
    }


    return (
        <div className="wrapper">
            {users}
        </div>
    );
}

export default UserList;