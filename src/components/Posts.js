import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MiniPost from './MiniPost';

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount(){
    axios
    .get('http://localhost:8080/posts', {
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
          <MiniPost
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
    currentUser: state.user,
  };
}

export default connect(mapStateToProps)(Posts);
