import React, { Component } from 'react'
import './App.css'
import Search from './components/Search';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MyItems from './components/MyItems';
import Item from './components/Item';
import ItemShow from './components/ItemShow';
import Form from './components/Form';


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
        // <div>sign in placeholder</div>
        <SignIn setView={this.setView.bind(this)}
          setUser={this.setUser.bind(this)} />
      )
    }
    else if (this.state.activeView === "myitems") {
      return (
        // <div> my items placeholder</div>
        <MyItems user={this.state.user}
          setView={this.setView.bind(this)}
          setCurrentItem={this.setCurrentItem.bind(this)}
          updateItem={this.updateItem.bind(this)}
          deleteItem={this.deleteItem.bind(this)}
          toggleModal={() => { this.toggleModal.bind(this) }} />
      )
    }
    else if (this.state.activeView === "itemshow") {
      return (
        // <div>item show placeholder</div>
        <ItemShow setView={this.setView.bind(this)}
          currentItem={this.state.currentItem}
          user={this.state.user}
          deleteItem={this.deleteItem.bind(this)}
          updateItem={this.updateItem.bind(this)} />
      )
    }
    else if (this.state.activeView === "form") {
      return (
        // <div>form placeholder</div>
        <Form user={this.state.user}
              setView={this.setView.bind(this)} />

      )
    }
  }

  updateItem(item) {
    const url = `http://localhost:3000/items/${this.state.currentItem.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then(data => {
        const updateItem = this.state.items.map(item => {
          return item.id === data.id ? data : item
        })
        console.log('current state:', this.state.items);
        console.log('new state:', updateItem)
        this.setState({
          items: updateItem,
          activeView: item,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteItem(id) {
    const url = `http://localhost:3000/items/${this.state.currentItem.id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const updateItems = this.state.items.filter(item => item.id !== id)//condition
        console.log(data);
        this.setState({
          items: updateItems,
          currentItem: null //

        })
      })
      .catch(error => {
        console.log(error);

      })
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleSubmit(item) {
    if (this.state.currentItem) {
      this.updateItem(item)
    }
  }

  render() {

    return (
      <div className="app">
        {/* <Form/> */}
        <div className="header">
          <h1 className="mainHeading" onClick={() => this.setView("landing")}>Lost and Found</h1>
          <div className="actionButtons">
            <button className="searchButton" onClick={() => this.setView("search")} >Search</button>
            {(this.state.user) ?
              <div>
                <button className="myItemsButton" onClick={() => this.setView("myitems")} >My Items</button>
                <button className="logoutButton" onClick={() => this.setUser(null)}>Log Out</button>
              </div>
              : <button className="loginRegisterButton" onClick={() => this.setView("signin")} >Login/Register</button>}
          </div>
        </div>


        {this.renderContent()}
      </div>
    )
  }
}

export default App;