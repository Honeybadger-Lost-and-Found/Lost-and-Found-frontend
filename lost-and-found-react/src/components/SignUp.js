import React, { Component } from 'react';


class SignUp extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);

        const url = 'http://localhost:3000/users'
        fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: data
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log("Success"); 
          })
    }
   
    render(){
        return(
            <div>
            <form className="show-form" onSubmit={this.handleSubmit()}>
            <label>Name:</label><input type="text"  name="name" /><br/>
              <label>Email:</label><input type="text" name="email" /><br/>
              <label>Phone:</label><input type="text" name="phone" /><br/>
              <button>submit</button>
            </form>
          </div>
        )
    }
}       
export default SignUp;
