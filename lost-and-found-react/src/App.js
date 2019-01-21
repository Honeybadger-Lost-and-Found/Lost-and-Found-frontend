import React, { Component } from 'react'
import './App.css'
import Search from './components/Search';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MyItems from './components/MyItems';
import ItemShow from './components/ItemShow';
import Form from './components/Form';
import Button from '@material-ui/core/Button';


class App extends Component {
  constructor() {
    super();
    this.state = {
      activeView: "landing",
      user: null,
      currentItem: null,
      formType: "new",
      myItems: []
    }
  }

  setView(view) {
    this.setState({ activeView: view })
  }

  setUser(user) {
    this.setState({ user: user });
    if (user !== null && user.username) this.fetchUserItems(user.username);
  }

  setCurrentItem(item) {
    // console.log("step 2", "set current item", item)
    this.setState({ currentItem: item });
  }

  setFormType(type) {
    this.setState({ formType: type })
  }
  

  fetchUserItems(username) {
    const url = `https://lost-and-found.herokuapp.com/items/users/${username}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log("DATAAAA", data)
        this.setState({
          myItems: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  concatMyItems(item) {
    this.setState({ myItems: this.state.myItems.concat(item) })
  }

  renderContent() {
    if (this.state.activeView === "landing") {
      return (
        <div className="landing">

          <div className="description">
          <p>
              Be a good person and report here if you <span className="span">found</span> something that belongs<br></br> to someone else.<br></br><br/>
              You can also report that you  <span className="span">lost</span> something <br></br>and if another user finds it, they can contact you.
           </p>
          </div>

          <div>
            <Button id="postButton" onClick={() => {
              if (this.state.user) this.setView("form")
              else this.setView("signin")
              this.setFormType("new")
              this.setCurrentItem({});
            }}
            >Post an Item!</Button>
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
          deleteItems={this.deleteItem.bind(this)}
          myItems={this.state.myItems} />
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
            setCurrentItem={this.setCurrentItem.bind(this)}
            concatMyItems={this.concatMyItems.bind(this)} 
            modifyMyItems={this.modifyMyItems.bind(this)}/>
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
      .then(response => response.json())
      .then(data => {
        const updatedArray = this.state.myItems.map((element) => {
          return element.id === item.id ? item : element;
        })
        this.setState({
          myItems: updatedArray,
          currentItem: item,
          activeView: "itemshow",
          formType: "new"
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  modifyMyItems(item){
    const updatedArray = this.state.myItems.map((element) => {
      return element.id === item.id ? item : element;
    })
    this.setState({
      myItems: updatedArray,
      currentItem: item,
      activeView: "itemshow",
      formType: "new"
    })
  }


  deleteItem(id) {
    const url = `http://localhost:3000/items/${this.state.currentItem.id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        const filteredArray = this.state.myItems.filter((item) => item.id !== id)
        this.setState({
          currentItem: null,
          myItems: filteredArray,
          activeView: "myitems"
        });
      })
      .catch(error => {
        console.log(error);
      })
  }


  render() {
    return(
      <div className="app">
        {/* <Form/> */}
        
        <div className="header">
          <h1 className="mainHeading" onClick={() => this.setView("landing")}>Lost and Found</h1>

          <div className="actionButtons">
           

            {(this.state.user) ?
              <div>
                <Button id="postButton" onClick={() => {
                  if (this.state.user) this.setView("form")
                  else this.setView("signin")
                  this.setFormType("new");
                  this.setCurrentItem({});
                }}
                >Post an Item!</Button>
                <Button id="myItemsButton" onClick={() => this.setView("myitems")} >My Items</Button>
                <Button id="logoutButton" onClick={() => {
                  this.setUser(null);
                  this.setView("landing");
                }}
                >Log Out</Button>
              </div>
              : <Button id="loginRegisterButton" onClick={() => this.setView("signin")} >Login/Register</Button>}
          </div>
          <Button id="searchbutton" onClick={() => this.setView("search")} >Search</Button>

        </div>

      <div className="renderContent">
      <br></br>
        {this.renderContent()}
     </div>
      </div>
    )
  }
}

export default App;