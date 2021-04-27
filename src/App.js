// import logo from './logo.svg';
import './styles/custom.css';
import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Welcome from './components/Welcome';
import RegistrationForm from './components/RegistrationForm';
import SigninForm from './components/SigninForm';
import Posts from './components/Posts';
import Post from './components/Post';
import CreatePostForm from './components/CreatePostForm';
import UserPosts from './components/UserPosts';
import { logout } from './actions/index';

class App extends React.Component {

  render(){
    return (
      <div className="main-container-react">
        <nav className="navbar">

          <h1 id="site-name">Medium++</h1>

          <div className="navbar-links">
            {this.props.user ? (
              <>
                <Link to="/posts">View posts</Link>
                <Link to="/user/posts">My posts</Link>
                <Link to="/posts/create">Create post</Link>
                <button onClick={this.props.logout} id="logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register">Get Started</Link>
                <Link to="/signin">Sign In</Link>
                {/* <Redirect to="/welcome" /> */}
              </>
            )}
          </div>
          
        </nav>

        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>

        <Route exact path="/welcome">
          {this.props.user && <Redirect to="/posts" />}
          <Welcome />
        </Route>

        <Route exact path="/register">
          {this.props.user && <Redirect to="/posts" />}
          <RegistrationForm />
        </Route>

        <Route exact path="/signin">
          {this.props.user && <Redirect to="/posts" />}
          <SigninForm />
        </Route>

        <Route exact path="/posts">
          {!this.props.user && <Redirect to="/welcome" />}
          <Posts />
        </Route>

        
        <Route exact path="/post">
          {this.props.postToView === null ? <Redirect to="/posts" /> : <Post />}
          {!this.props.user && <Redirect to="/welcome" />}
          {/* ????          */}
        </Route>

        <Route exact path="/posts/create">
          {!this.props.user && <Redirect to="/welcome" />}
          <CreatePostForm />
        </Route>

        <Route exact path="/user/posts">
          {!this.props.user && <Redirect to="/welcome" />}
          <UserPosts />
        </Route>
        
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const mapStateToProps = state => {
  return {
    postToView: state.postToView,
    user: state.user
  };
};

export default connect(mapStateToProps, {logout})(App);
