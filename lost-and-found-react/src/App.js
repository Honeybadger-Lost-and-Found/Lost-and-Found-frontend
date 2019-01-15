import React, { Component } from 'react'
import './App.css'
import Search from './components/Search';
import Item from './components/Item';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeView: "landing",
      user: null,
      currentItem: null
    }
  }

  setView(view) {
    this.setState({ activeView: view })
  }

  setUser(user) {
    this.setState({ user: user });
  }

  setCurrentItem(item) {
    this.setState({ currentItem: item });
  }

  renderContent() {
    if (this.state.activeView === "landing") {
      return (
        <div className="landing">

          <div className="description">
            <p>
              Be a good person and report here if you found something that belongs to someone else.
              You can also report that you lost something and if another user finds it, they can contact you.
           </p>
          </div>

          <div className="landingButtonContainer">
            <button className="landingButton" onClick={() => {
              if (this.state.user) this.setView("form")
              else this.setView("signin")
            }}
            >Post an Item!</button>
          </div>

        </div>
      )
    }

    else if (this.state.activeView === "search") {
      return (
        <Search setView={this.setView.bind(this)} />
      )
    }
    else if (this.state.activeView === "signup") {
      return (
        <SignUp setView={this.setView.bind(this)}
          setUser={this.setUser.bind(this)} />
      )
    }
    else if (this.state.activeView === "signin") {
      return (
        <div>sign in placeholder</div>
        // <SignIn setView={this.setView.bind(this)}
        //   setUser={this.setUser.bind(this)} />
      )
    }
    else if (this.state.activeView === "myitems") {
      return (
        <div> my items placeholder</div>
        // <MyItems user={this.state.user}
        // setView={this.setView.bind(this)} />
      )
    }
    else if (this.state.activeView === "itemshow") {
      return (
        <div>item show placeholder</div>
        // <ItemShow setView={this.setView.bind(this)}
        //           currentItem={this.state.currentItem} />
      )
    }
    else if (this.state.activeView === "form") {
      return (
        <div>form placeholder</div>
        // <Form user={this.state.user} />
      )
    }
  }

  render() {

    return (
      <div className="app">
      
        <div className="header">
          <h1 className="mainHeading" onClick={() => this.setView("landing")}>Lost and Found</h1>
          <div className="actionButtons">
            <button onClick={() => this.setView("search")} className="searchButton">Search</button>
            {(this.state.user) ? <button onClick={() => this.setView("myitems")} className="myItemsButton">My Items</button>
              : <button onClick={() => this.setView("signin")} className="loginRegisterButton">Login/Register</button>}
          </div>
        </div>

        {this.renderContent()}
      </div>
    )
  }
}

export default App;