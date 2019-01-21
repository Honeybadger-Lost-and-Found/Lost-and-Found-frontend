import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleSubmit(event) {
        if (this.state.username === '') {
            this.props.setView("signup");
        }
        else {

            event.preventDefault();
            const url = `https://lost-and-found.herokuapp.com/${this.state.username}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data === null) {
                        this.props.setView('signup')
                    }
                    else {
                        this.props.setUser(data)
                        this.props.setView('landing')
                    }
                    // console.log(data);
                })
                .catch(error => console.log(error))
        }
    }
    handelChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <Card id="signInCard">
                <div className="signIn">
                    <h3>Sign In</h3>
                    <form>

                        <label > Username: </label> <br /><TextField id="username" type="text" name="username" onChange={this.handelChange.bind(this)} />
                        <br></br><br></br>

                        <Button id="signInButton" onClick={this.handleSubmit.bind(this)}>Submit</Button>

                        <br></br><br></br>
                        <p>No account? <span className="signupSpan" onClick={() => this.props.setView('signup')} >Sign Up now! </span> </p>
                    </form>
                </div>
            </Card>
        )
    }
}

export default SignIn;