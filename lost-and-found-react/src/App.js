import React, { Component } from 'react'
import './App.css'
import Search from './components/Search';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MyItems from './components/MyItems';
import ItemShow from './components/ItemShow';
import Form from './components/Form';
import Item from './components/Item';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeView: "landing",
      user: null,
      currentItem: null,
      formType: "new"
    }
  }

  setView(view) {
    this.setState({ activeView: view })
  }

  setUser(user) {
    this.setState({ user: user });
  }

  setCurrentItem(item) {
    console.log("step 2", "set current item", item)
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
              this.setFormType("new")
              this.setCurrentItem({});
            }}
            >Post an Item!</button>
          </div>

        </div>
      )
    }

    else if (this.state.activeView === "search") {
      return (
        <Search setView={this.setView.bind(this)}
          setCurrentItem={this.setCurrentItem.bind(this)} />
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
          updateItems={this.updateItem.bind(this)}
          deleteItems={this.deleteItem.bind(this)} />
      )
    }
    else if (this.state.activeView === "itemshow") {
      return (
        // <div>item show placeholder</div>
        <ItemShow setView={this.setView.bind(this)}
          currentItem={this.state.currentItem}
          user={this.state.user}
          deleteItem={this.deleteItem.bind(this)}
          updateItem={this.updateItem.bind(this)}
          setFormType={this.setFormType.bind(this)}
        />
      )
    }
    else if (this.state.activeView === "form") {
      if (this.state.currentItem) {
        return (
          // <div>form placeholder</div>
          <Form user={this.state.user} formType={this.state.formType} item={this.state.currentItem}
            setView={this.setView.bind(this)} setFormType={this.setFormType.bind(this)}
            setCurrentItem={this.setCurrentItem.bind(this)} />
        )
      }
      else {
        return (
          <Form user={this.state.user} formType={this.state.formType}
            setView={this.setView.bind(this)} setFormType={this.setFormType.bind(this)}
            setCurrentItem={this.setCurrentItem.bind(this)} />
        )
      }
    }
  }

  setFormType(type) {
    this.setState({ formType: type })


  }

  updateItem(item) {
    console.log("updating item \n\n\n\n\n")
    const url = `http://localhost:3000/items/${this.state.currentItem.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .catch(error => {
        console.log(error);
      })
  }


  deleteItem() {
    const url = `http://localhost:3000/items/${this.state.currentItem.id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
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


  render() {
    return(
      <div className="app">
        {/* <Form/> */}
        <div className="header">
          <h1 className="mainHeading" onClick={() => this.setView("landing")}>Lost and Found</h1>
          <div className="actionButtons">
            <button className="searchButton" onClick={() => this.setView("search")} >Search</button>

            {(this.state.user) ?
              <div>
                <button className="postButton" onClick={() => {
                  if (this.state.user) this.setView("form")
                  else this.setView("signin")
                  this.setFormType("new");
                  this.setCurrentItem({});
                }}
                >Post an Item!</button>
                <button className="myItemsButton" onClick={() => this.setView("myitems")} >My Items</button>
                <button className="logoutButton" onClick={() => {
                  this.setUser(null);
                  this.setView("landing");
                }}
                >Log Out</button>
              </div>
              : <button className="loginRegisterButton" onClick={() => this.setView("signin")} >Login/Register</button>}
          </div>
          {this.renderContent()}
    </div>
  
        </div>
      
              

     
              )}
           
            }



export default App;