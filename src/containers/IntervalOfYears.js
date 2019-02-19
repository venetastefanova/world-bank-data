import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import * as actions from "../store/actions/actions";

import * as actionsIntervalOfYears from "../store/actions/IntervalOfYears";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import CanvasJSReact from "../canvasjs.react";

class IntervalOfYears extends Component {
  state = {
    year1: "",
    year2: "",
    value: "",
    suggestions: [],
    countryCode: ""
  };
  //gets the input and trims it
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    //checks if the input value matches the provided country information
    return inputLength === 0
      ? []
      : this.props.allCountries.filter(
          country =>
            country.name.toLowerCase().slice(0, inputLength) === inputValue ||
            country.id.toLowerCase().slice(0, inputLength) === inputValue ||
            country.code.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  //populates the input based on the selected item
  getSuggestionValue = suggestion => {
    return suggestion.name;
  };

  // render suggestions
  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidMount() {
    this.props.onGetAllCountries();
    // this.props.onGetAllYears();
    console.log(this.props.years);
  }

  getCountryCode = () => {
    const code = this.props.allCountries.find(
      country => country.name === this.state.value
    );
    console.log(code);
    this.setState({
      country: code.id
    });
    this.props.onGetCountryDataForIntervalYears(code.id, this.state.year1, this.state.year2);
  };
  getValueYear1 = e => {
    this.setState({
      year1: e.target.value
    });
    console.log(e.target.value);
  };
  getValueYear2 = e => {
    this.setState({
      year2: e.target.value
    });
    console.log(e.target.value);
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.

    const inputProps = {
      placeholder: "Country",
      value,
      onChange: this.onChange
    };

    const year = this.props.years.map((year, index) => {
      return (
        <option key={index} value={year}>
          {year}
        </option>
      );
    });

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />

        <select onChange={this.getValueYear1}>{year}</select> - 
        <select onChange={this.getValueYear2}>{year}</select>
        <button type="button" onClick={this.getCountryCode}>
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // currentPopulationData: state.Filter.currentPopulationData,
    // currentEmissionsData: state.Filter.currentEmissionsData,
    allCountries: state.Filter.allCountries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountryDataForIntervalYears: (country, year1,year2) => dispatch(actionsIntervalOfYears.getCountryDataForIntervalYears(country, year1,year2)),
    onGetAllCountries: () => dispatch(actions.getAllCountries())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IntervalOfYears)
);
