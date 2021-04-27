import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class CreatePostForm extends React.Component {

  state = {
    content: '',
    user_id: this.props.user._id,
    title: ''
  }

  contentChangeHandler = (e) => {
    this.setState({
        content: e.target.value,  
    });
  }

  submit = () => {
    axios.post('http://localhost:8080/posts', this.state,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      this.setState({
        content: '',
        title: ''
      });
      alert("Post submitted successfully!");
    });
  }

  render(){
    return (
      <div className="create-post-textarea-container">
        <h2>Submit a Blog Post</h2>
        <p>Please write your blog post in the text area below.</p>
        <hr></hr>

        Title:{' '}
        <input 
          type="text" 
          value={this.state.title}
          onChange={(e) => { this.setState({ title: e.target.value }) }}
          name="title" id="title" required
        />
        <br />
        Content:{' '}
        <textarea 
          autoFocus={true} 
          id='form-blog-content' 
          rows='20' 
          value={this.state.content}
          onChange={this.contentChangeHandler}/>

        <button 
          className="create-post-btn"
          onClick={ this.submit }
        >Submit</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
  };
}
  
export default connect(mapStateToProps)(CreatePostForm);