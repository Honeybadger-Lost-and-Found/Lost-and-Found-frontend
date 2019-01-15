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
          name : this.state.name,
          email : this.state.email,
          phone : this.state.phone
        }
        console.log(data)
        const url = 'http://localhost:3000/users'
        fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log("Success"); 
          })
    }

   handelChange(event) {
      this.setState({[event.target.name]: event.target.value});  
  }
   
    render(){
        return(
            <div>
            <form onSubmit={this.handleSubmit()}>
            <label>Name:</label><input type="text" onChange={this.handelChange()} name="name" /><br/>
              <label>Email:</label><input type="text" onChange={this.handelChange()} name="email" /><br/>
              <label>Phone:</label><input type="text" onChange={this.handelChange()} name="phone" /><br/>
              <button>submit</button>
            </form>
          </div>
        )
    }
}       
export default SignUp;

