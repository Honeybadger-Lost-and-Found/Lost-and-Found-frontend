import React, { Component } from 'react'
import './App.css'
import Search from './components/Search';
import Item from './components/Item';


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
        <div className="header">
          <h1>Lost and Found</h1>
          <div className="actionButtons">
            <button onClick={() => this.setView("search")} className="searchButton">Search</button>
            {(this.state.user) ? <button onClick={ () => this.setView("myitems")} className="myItemsButton">My Items</button>
              : <button onClick={() => this.setView("signin")} className="loginRegisterButton">Login/Register</button>}
          </div>
        </div>

        {/* {this.state.activeView === "search" ? } */}
      </div>
    )
  }
}

export default App;