let user;
if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
} else {
  user = null;
}

const initialState = {
  user: user,
  postToView: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNIN':
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
          user: action.payload
        };
      case 'LOGOUT':
        localStorage.removeItem('user');
        return {
          ...state,
          user: null
        };
      case 'VIEWPOST':
        return {
          ...state,
          postToView: action.payload
        }
      case 'UPDATECOMMENTS':
        const post = {...state.postToView};

        const newComment = action.payload[action.payload.length - 1];

        let dummyComment = {
          content: newComment.content,
          likes: newComment.likes,
          _id: newComment._id,
          user: {
            username: state.user.username
          }
        };

        post.comments.push(dummyComment);

        return {
          ...state,
          postToView: post
        }

      case 'LOGOUT':
        window.localStorage.clear();
        return {
          ...state,
          user: null,
          postToView: null
        };
      default:
        return state;
    }
};

export default reducer;