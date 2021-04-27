import React from 'react';
import { Redirect } from 'react-router-dom';
import { viewPost } from '../actions';
import { connect } from 'react-redux';
import DeleteButton from './DeleteButton';

class UserPost extends React.Component {

  state = {
    isClicked: false
  }

  clickHandler = (e) => {
    this.props.post.user_id = {
        _id: this.props.post.user_id,
        username: this.props.user.username,
    }
    this.props.viewPost(this.props.post);
    this.setState({isClicked: true});
  }

  createDate = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 
      'May', 'Jun', 'Jul', 'Aug', 
      'Sep', 'Oct', 'Nov', 'Dec'];

    const postDate = new Date(date);

    const monthIndex = postDate.getMonth();
    const day = postDate.getDate();

    return `${months[monthIndex]} ${day}`

  }

  render() {
    return (
      <li 
        className="minipost-container" 
        onClick={ this.clickHandler }
        id={this.props.post._id}  
      >
      {console.log(this.props.post)}
      {console.log(this.props.user)}
        {this.state.isClicked ? <Redirect to="/post" /> : null}
        <h2>{this.props.post.title}</h2>
        {this.createDate(this.props.post.createdAt)}
        <hr />
        {this.props.post.user_id === this.props.user._id
        ?
        <DeleteButton 
          post={this.props.post}
        />
        :
        null
        }
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { viewPost })(UserPost);