import React, { Component } from 'react';
import './App.sass';
import InputNickname from '../InputNickname/InputNickname';
import UserList from '../UserList/UserList'
import FilterCheck from '../Filter/Filter'

class App extends Component {
  state = {
    inputValue: '',
    users: [],
    display: "all"
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  handleFetchData = async (name) => {
    let response = await fetch(`https://api.github.com/users/${name}`);
    if (response.status === 200) {
      let data = await response.json();
      return data;
    }
  }

  handleAddButton = async (e) => {
    e.preventDefault();
    const fetchedData = await this.handleFetchData(this.state.inputValue);
    let noDuplicate = true;
    this.state.users.forEach(singleUser => {
      if ((fetchedData !== undefined) && (singleUser.login === fetchedData.login)) {
        noDuplicate = false;
      }
    })
    if ((fetchedData !== undefined) && (noDuplicate === true)) {
      this.setState((prevState) => ({
        users: [...prevState.users, fetchedData],
        display: "all",
        inputValue: '',
      }))

    } else {
      console.log("this user doesn't exist or you already have it in your list");
      this.setState({
        inputValue: ''
      })
    }
  };

  handleDeleteClick = (e) => {
    const id = Number(e.target.id)
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.id !== id)
    }))
  }

  handleFavoriteClick = (e) => {
    const id = Number(e.target.id)
    this.setState((prevState) => ({
      users: prevState.users.map(user => user.id === id ? { ...user, favorite: !user.favorite } : user)
    }))
  }

  handleAllDisplay = () => {
    this.setState({
      display: "all",
    })
  }

  handleFavDisplay = () => {
    this.setState({
      display: "favorite",
    })
  }

  componentDidMount() {
    if (localStorage.getItem("users") !== null) {
      const users = JSON.parse(localStorage.getItem("users"));
      this.setState({
        users: users,
      })
    }
  }

  componentDidUpdate() {
    if (JSON.parse(localStorage.getItem("users")) !== this.state.users) {
      localStorage.setItem("users", JSON.stringify(this.state.users))
    }
  }

  render() {
    return (
      <>
        <InputNickname
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleAddButton={this.handleAddButton} />
        <FilterCheck
          display={this.state.display}
          handleFavClick={this.handleFavDisplay}
          handleAllClick={this.handleAllDisplay} />
        <UserList
          display={this.state.display}
          handleFavoriteClick={this.handleFavoriteClick}
          handleDeleteClick={this.handleDeleteClick}
          users={this.state.users} />
      </>
    )
  }
}

export default App;