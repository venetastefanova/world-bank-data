import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
//containers and actions import
import IndividualCountry from "./containers/IndividualCountry/IndividualCountry";
import BiggestEmitters from "./containers/BiggestEmitters/BiggestEmitters";
import IntervalOfYears from "./containers/IntervalOfYears/IntervalOfYears";
import NearMe from "./containers/NearMe/NearMe";
import WorldPower from "./containers/WorldPower/WorldPower";
import * as globalActions from "./store/actions/globalActions";
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
  state={
    loading:false
  }
  componentDidMount() {
    this.props.onGetAllYears();
    this.setState(prevState => ({
      loading: !prevState.loading
    }));
  }

  render() {
    return (
      <div className="App">
      {this.state.loading 
      ? 
      <div>
        <Navigation/>
        <div className="App-header">
          <Switch>
            <Route path="/world-power" render={(props) => <WorldPower {...props} years={this.props.years} />}/>
            <Route path="/near-me" render={(props) => <NearMe {...props} years={this.props.years} />}/>
            <Route path="/interval-of-years" render={(props) => <IntervalOfYears {...props} years={this.props.years} />}/>
            <Route path="/biggest-emitters" render={(props) => <BiggestEmitters {...props} years={this.props.years} />}/>
            <Route path="/single-country-data" render={(props) => <IndividualCountry {...props} years={this.props.years} />}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
        <Footer/>
      </div>: <Spinner/>}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    years: state.IndividualCountry.years
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllYears: () => dispatch(globalActions.getAllYears())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
