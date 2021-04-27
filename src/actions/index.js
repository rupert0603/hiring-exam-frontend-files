export const signin = (user) => {
  return {
    type: 'SIGNIN',
    payload: user
  }
}

export const viewPost = (post) => {
  return {
    type: 'VIEWPOST',
    payload: post
  }
}

export const updateComments = (comments) => {
  return {
    type: 'UPDATECOMMENTS',
    payload: comments
  }
}

export const logout = () => { 
  return {
    type: 'LOGOUT' 
  }
}
