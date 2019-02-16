import React, { Component } from 'react';
import './App.css';
import Filter from './containers/Filter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <Filter/>
      
        </header>
      </div>
    );
  }
}

export default App;
