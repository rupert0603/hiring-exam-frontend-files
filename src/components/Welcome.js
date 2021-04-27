import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {

  render () {
    return(
        <section className="home-section-container">
            <em className="home-tagline">Where good ideas find you</em>
            <br />
            <br />
            <p>Read and share new perspectives on just about any topic. Everyone’s welcome.</p>
            <br />
            <br />
            <Link to="/register">Get Started</Link>
        </section>
    );  
  }
}

export default Welcome;