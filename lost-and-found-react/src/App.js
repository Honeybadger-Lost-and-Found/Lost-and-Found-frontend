import React, { Component } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Item from './components/Item'

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeView: "landing",
      user: null
    }
  }

  setView(view) {
    this.setState({ activeView: view })
  }

  setUser(user) {
    this.setState({ user: user });
  }



  render() {

    return (
      <div className="app">
      <SignIn/>
      <SignUp/>
        <div className="header">
          <h1>Lost and Found</h1>
          <div className="actionButtons">
            <button onClick={() => this.setView("search")} className="searchButton">Search</button>
            {(this.state.user) ? <button onClick={ () => this.setView("myitems")} className="myItemsButton">My Items</button>
              : <button onClick={() => this.setView("signin")} className="loginRegisterButton">Login/Register</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;