import React from 'react';
import './UserList.sass'
import User from '../User/User'



const UserList = (props) => {

    let users = props.users;
    if (props.display === "all") {
        users = users.map(user => <User handleDeleteClick={props.handleDeleteClick} handleFavoriteClick={props.handleFavoriteClick} user={user} key={user.id} />)
    } else if (props.display === "favorite") {
        users = users.filter(user => user.favorite);
        users = users.map(user => <User handleDeleteClick={props.handleDeleteClick} handleFavoriteClick={props.handleFavoriteClick} user={user} key={user.id} />)
    }

    return (
        <div className="wrapper">
            {users}
        </div>
    );
}

export default UserList;