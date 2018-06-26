import React, { Component } from 'react';
import { Grid } from '../Grid/Grid';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='title'>The Void</h1>
        <h2 className='subtitle'>Find your path through the stars</h2>
        <Grid />
        <footer>
          <h5>Made by <a href="https://github.com/cookiehunter22">Gleb Irovich</a></h5>
        </footer>
      </div>
    );
  }
}

export default App;
