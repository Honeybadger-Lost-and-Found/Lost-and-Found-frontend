import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : ''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const url = `http://localhost:3000/users/${this.state.username}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data === null){
                this.props.setView('signup')
            }
            else{
                this.props.setUser(data)
                this.props.setView('landing')
            }
            console.log(data)
        })
        .catch(error => console.log(error))
    }
    handelChange(event){
        this.setState({
            username: event.target.value
        })
    }

    render(){
        return(
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="username" onChange={this.handelChange.bind(this)}/>
                    <button>Submit</button>
                    <p>No account? <span className="signupSpan" onClick={() => this.props.setView('signup')} >Sign Up now! </span> </p>
                </form>
            </div>
        )
    }
}

export default SignIn;