import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Comment extends React.Component {

  state = {
    isLiked: false,
    numLikes: this.props.comment.likes.length
  }

  checkIfLiked = (likesArray, userId) => {
    const user = likesArray.filter(like => {
      return like._id._id === userId; 
    });
  
    if (user.length === 0) {
      return false; //this means user still has not liked the post
    } else {
      return true; //this means otherwise
    }
  }

  toggleLike = () => {
    axios
    .patch(`http://localhost:8080/posts/${this.props.post_id}/comment/${this.props.comment._id}`, 
    {
      user_id: this.props.user._id
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(
      res => {
          if(this.state.isLiked === false){
              this.setState({
                  isLiked: !this.state.isLiked,
                  numLikes: this.state.numLikes + 1,
              });
          } else {
              this.setState({
                  isLiked: !this.state.isLiked,
                  numLikes: this.state.numLikes - 1,
              });
          }
      }    
    )
    .catch(
      err => {
        console.log(err);    
      }
    )
  }

  componentDidMount(){
    const didLike = this.checkIfLiked(this.props.comment.likes, this.props.user._id);

    this.setState({
      isLiked: didLike
    });
  }

  render() {
    return (
      <div className="comment-container">
      {console.log(this.props.comment)}
        <p className="comment-content">{this.props.comment.content}</p>
        <p className="comment-author">Submitted by: {this.props.comment.user.username}</p>
        <p className="comment-likes">
          <i onClick={this.toggleLike} 
          className="fa fa-thumbs-up thumbs-up-icon"
          style={this.state.isLiked ? {color: "blue"} : {color: "gray"}}
          ></i> {this.state.numLikes} people like this comment
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  }
  
export default connect(mapStateToProps)(Comment);
