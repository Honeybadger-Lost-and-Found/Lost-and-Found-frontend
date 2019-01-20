import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';


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
          .then(response => response.json())
          .then(data => {
            console.log("SignUp successful for: ", data);
            this.props.setUser(data);
            this.props.setView("landing");
          })
          .catch(error => {
            document.getElementById("signUpStatus").innerHTML = "Username already taken."
            console.log(error);
          })
    }

    handleChange(event) {
      console.log("changes"); 

      let formData = {}; 
      formData[event.target.name] = event.target.value ; 
   
      this.setState(formData);
    }

   
    render(){
        return(
          <Card id="signUpCard">
           <div className="signUp">
              <h3>Sign Up</h3>
            <form>
              <label>Name:</label><br></br>
              <TextField required type="text" onChange={this.handleChange.bind(this)} name="username" /><br/>
              <br></br>
              <label>Email:</label><br></br>
              <TextField required type="text" onChange={this.handleChange.bind(this)}  name="email" /><br/>
              <br></br>
              <label>Phone:</label><br></br>
              <TextField required type="text" onChange={this.handleChange.bind(this)}  name="phone" /><br/>
              
              <br></br>
              
              <Button id="signUpButton" variant="outlined" onClick={this.handleSubmit.bind(this)}> submit</Button>

            </form>
            <p id="signUpStatus"></p>
          </div>
          </Card>
        )
    }
}

export default SignUp;