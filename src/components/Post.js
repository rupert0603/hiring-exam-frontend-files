import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';

class Post extends React.Component {
  state = {
    // posts: []
    isLiked: false,
    numLikes: this.props.post.likes.length
  };

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
      .patch(`http://localhost:8080/posts/${this.props.post._id}`, 
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
    const didLike = this.checkIfLiked(this.props.post.likes, this.props.user._id);

    this.setState({
      isLiked: didLike
    });
  }

  render(){
    return (
      <div>
        <article className="post-container">
            <h2 className="post-title">{this.props.post.title}</h2>
            <br />
            <p className="post-content">{this.props.post.content}</p>
            <p className="post-author">Author: <span>{this.props.post.user_id.username}</span></p>
            <p>
                <i onClick={this.toggleLike} 
                className="fa fa-thumbs-up thumbs-up-icon"
                style={this.state.isLiked ? {color: "blue"} : {color: "gray"}}
                ></i> {this.state.numLikes} people like this post
            </p>
        </article>
        <section className="post-comments-container">
          <CommentForm />
          <div className="comments-container">
            <h2 className="comment-container-header">Comments</h2>
            {this.props.post.comments.map((comment, index) => {
              return <Comment 
                key={comment._id}
                comment={comment}
                index={index}
                post_id={this.props.post._id}
              />
            })}
          </div>
        </section>
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

export default connect(mapStateToProps)(Post);