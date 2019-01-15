import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            activeView: null
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const url = `http://localhost:3000/users`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                username: data.username
            })
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
                    <p>Not Sign up yet ? Sign Up now </p>
                    {/* <button onClick={this.props.setView('signup')}>Sign Up</button> */}
                </form>
            </div>
        )
    }
}

export default SignIn;