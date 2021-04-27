import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MiniPost from './MiniPost';
import UserPost from './UserPost';

class UserPosts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount(){
    axios
    .get(`http://127.0.0.1:8080/user/${this.props.user._id}/posts`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data.data
      });
    });
  }

  render(){
    return (
      <ol className="posts-container">
        {this.state.posts.map((post, index) => (
          <UserPost
            key={post._id}
            post={post}
          />
        ))}
      </ol>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.user,

  };
}

export default connect(mapStateToProps)(UserPosts);