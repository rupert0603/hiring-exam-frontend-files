import React from 'react';
import axios from 'axios';

class RegistrationForm extends React.Component {

  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',    
  }

  register = () => {
    if(
      this.state.email.length === 0 || 
      this.state.username.length === 0 || 
      this.state.password.length === 0 ||
      this.state.confirmPassword.length === 0
      ){
      alert("Please enter valid credentials");
      return;
    }

    if(this.state.confirmPassword !== this.state.password){
      return (alert(`Passwords doesn't match. Please type the same passwords`));
    }

    axios.post('http://localhost:8080/register', this.state)
    .then(res => {
      alert("You've successfully registered. You can now sign in");
      this.setState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '', 
      });
    })
    .catch(
      err => {
        alert("There's something wrong. The details you entered might already exist.");
        return;
      }
    );
    
  }

  render(){
    return (
      <div className="reg-form-container">
        <h2>Get Started</h2>
        <p>Please fill in this form to create an account.</p>
        <hr></hr>

        Email:{' '}
        <input 
          type="email" 
          value={this.state.email}
          onChange={(e) => { this.setState({ email: e.target.value }) }}
          name="email" id="email" required
        />
        Username:{' '}
        <input 
          type="text" 
          value={this.state.username}
          onChange={(e) => { this.setState({ username: e.target.value }) }}
          name="usn" id="usn" required
        />
        <br />
        Password:{' '}
        <input 
          type="password" 
          value={this.state.password}
          onChange={(e) => { this.setState({ password: e.target.value }) }}
          name="psw" id="psw" required
        />
        <br />
        Confirm Password:{' '}
        <input 
          type="password" 
          value={this.state.confirmPassword}
          onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
          name="psw-repeat" id="psw-repeat" required
        />
        <br />
        <button 
          className="registerbtn"
          onClick={ this.register }
        >Register</button>
      </div>
    );
  }
}

export default RegistrationForm;