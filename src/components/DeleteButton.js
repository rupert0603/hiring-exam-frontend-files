import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class DeleteButton extends React.Component {

  deleteBtnHandler = (e) => {
    e.stopPropagation();
    const input = window.confirm("Are you sure you want to delete this post?");
    if(!input){
      return;
    }

    console.log(localStorage.getItem('token'));
    axios
      .delete(`http://localhost:8080/posts/${this.props.post._id}`, {
        data: { token: localStorage.getItem('token') }
      })
      .then(res => {
        console.log(res);
        alert("Post has been succesfully deleted");
        document.getElementById(this.props.post._id).remove();
      });

  }

  render() {
    return (
      <button onClick={this.deleteBtnHandler} className="delete-btn">
        Delete Post
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(DeleteButton);