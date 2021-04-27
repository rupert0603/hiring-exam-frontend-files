import React from 'react';
import axios from 'axios';
import { signin } from '../actions';
import { connect } from 'react-redux';

class SigninForm extends React.Component {

  state = {
    // email: '',
    username: '',
    password: '', 
  }

  signin = () => {
    if(this.state.username.length === 0 || this.state.password.length === 0){
      alert("Please enter valid credentials");
      return;
    }

    axios.post('http://localhost:8080/login', this.state)
    .then(res => {
      
      alert('Success');
      console.log(res.data);
      localStorage.setItem('token', res.data.data.token);
      this.props.signin(res.data.data.user);
    }).catch(
      err => {
        alert("Invalid log in credentials.");
        return;
      }
    );
  }

  render(){
    return (
      <div className="reg-form-container">
        <h2>Sign In</h2>
        <p>Please fill in this form to sign in.</p>
        <hr></hr>

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
        <button 
          className="signinbtn"
          onClick={ this.signin }
        >Sign In</button>
      </div>
    );
  }
}

export default connect(null, { signin })(SigninForm);