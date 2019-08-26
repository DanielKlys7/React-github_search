import React, { Component } from 'react';
import './App.sass';
import InputNickname from './InputNickname';
import UserList from './UserList'
import FilterCheck from './Filter'


class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }
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

  async handleFetchData(name) {
    let response = await fetch(`https://api.github.com/users/${name}`);
    if (response.status === 200) {
      let data = await response.json();
      return data;
    }
  }

  async handleAddButton(e) {
    e.preventDefault();
    const fetchedData = await this.handleFetchData(this.state.inputValue);
    let noDuplicate = true;
    this.state.users.forEach(singleUser => {
      if ((fetchedData !== undefined) && (singleUser.login === fetchedData.login)) {
        noDuplicate = false;

      }
    })
    if ((fetchedData !== undefined) && (noDuplicate === true)) {
      this.setState({
        users: [...this.state.users, fetchedData],
        display: "all",
        inputValue: '',
      })
    } else {
      console.log("this user doesn't exist or you already have it in your list");
      this.setState({
        inputValue: ''
      })
    }
    localStorage.setItem("users", JSON.stringify(this.state.users))
  };

  handleDeleteClick = (e) => {
    e.preventDefault();
    this.setState({
      users: this.state.users.filter(user => user.id !== parseInt(e.target.id))
    })
    localStorage.setItem("users", JSON.stringify(this.state.users))
  }

  handleFavoriteClick = (e) => {
    e.preventDefault()
    const users = this.state.users.map(user => {
      if (user.id === parseInt(e.target.id)) {
        if (!user.favorite) {
          user.favorite = true;
        } else {
          user.favorite = false;
        }
      }
      return user
    })
    this.setState({
      users: users,
    })
    localStorage.setItem("users", JSON.stringify(this.state.users))
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



  render() {
    return (
      <>
        <InputNickname inputValue={this.state.inputValue} handleInputChange={this.handleInputChange} handleAddButton={this.handleAddButton} />
        <FilterCheck display={this.state.display} handleFavClick={this.handleFavDisplay} handleAllClick={this.handleAllDisplay} />
        <UserList display={this.state.display} handleFavoriteClick={this.handleFavoriteClick} handleDeleteClick={this.handleDeleteClick} users={this.state.users} />
      </>
    )
  }
}

export default App;