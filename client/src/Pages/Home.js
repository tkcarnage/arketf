import React from 'react';
import './Home.css';

function Home(props) {
  console.log('env--->', process.env.REACT_APP_API_URI);
  return <div className="Home"></div>;
}

export default Home;
