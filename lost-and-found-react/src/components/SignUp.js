import React, { Component } from 'react';


class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
          username :'',
          email : '',
          phone : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit(event){
        event.preventDefault();
        const data = {
          username : this.state.username,
          email : this.state.email,
          phone : this.state.phone
        }


        console.log("data\n\n\n\n\n\n ******" , data)
        const url = 'http://localhost:3000/users'
        fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          // .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log("Success"); 
          })
          .catch(error => {
            console.log(error);
          })
    }

    handleChange(event) {
      console.log("changes"); 

      let formData = {}; 
      formData[event.target.name] = event.target.value ; 
   
      this.setState(formData);
    }

    handleChange(event) {
      console.log("changes"); 

      let formData = {}; 
      formData[event.target.name] = event.target.value ; 
   
      this.setState(formData);
    }
   
    render(){
        return(
            <div>
              <h3>Sign Up</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>Name:</label><input type="text" onChange={this.handleChange.bind(this)} name="username" /><br/>
              <label>Email:</label><input type="text" onChange={this.handleChange.bind(this)}  name="email" /><br/>
              <label>Phone:</label><input type="text" onChange={this.handleChange.bind(this)}  name="phone" /><br/>
              <button>submit</button>
            </form>
          </div>
        )
    }
}

export default SignUp;

