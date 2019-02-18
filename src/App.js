import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Filter from './containers/Filter';
import BiggestEmitters from './containers/BiggestEmitters';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Switch>
       
          <Route path="/biggest-emitters" component={BiggestEmitters}/>
          <Route exact path="/" component={Filter}/>
        </Switch>
        
      
        </header>
      </div>
    );
  }
}

export default App;
