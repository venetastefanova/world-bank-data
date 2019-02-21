import React, { Component } from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import Filter from './containers/Filter';
import BiggestEmitters from './containers/BiggestEmitters/BiggestEmitters';
import IntervalOfYears from './containers/IntervalOfYears';
import NearMe from './containers/NearMe';

import {connect} from 'react-redux';
import * as actions from './store/actions/actions'

class App extends Component {
  componentDidMount() {
    this.props.onGetAllYears();
    console.log(this.props.years)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Switch>
          <Route path="/near-me" render={(props) => <NearMe {...props} years={this.props.years} />}/>
          <Route path="/interval-of-years" render={(props) => <IntervalOfYears {...props} years={this.props.years} />}/>
          <Route path="/biggest-emitters" render={(props) => <BiggestEmitters {...props} years={this.props.years} />}/>
          <Route exact path="/" render={(props) => <Filter {...props} years={this.props.years} />}/>
        </Switch>
        
      
        </header>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    years: state.Filter.years
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllYears: () => dispatch(actions.getAllYears()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

