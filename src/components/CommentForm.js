import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateComments } from '../actions';

class CommentForm extends React.Component {

  state = {
    comment: ''
  }

  commentClickHandler = () => {
    axios
    .post(`http://localhost:8080/posts/${this.props.post._id}/comment`, {
        user_id: this.props.user._id,
        content: this.state.comment
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
        this.setState({comment: ''});
        this.props.updateComments(res.data.data.comments);
    });
  }
  
  render() {
    return (
      <div>
        <input 
          type="text" 
          value={this.state.comment}
          onChange={(e) => { this.setState({ comment: e.target.value }) }}
          name="comment" id="comment" required
        />
        <button 
          className="commentbtn"
          onClick={ this.commentClickHandler }
        >Comment</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      post: state.postToView,
      user: state.user
  };
}
  
export default connect(mapStateToProps, { updateComments })(CommentForm);
