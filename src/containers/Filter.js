import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import Result from "../components/Result";

class Filter extends Component {
  state = {
    value: "",
    suggestions: [],
    countryCode: "",
    year: ""
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

    this.props.onGetCountryCode(code.id, this.state.year);
  };
  getValue = e => {
    this.setState({
      year: e.target.value
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

        <select onChange={this.getValue}>
        
        {year}</select>
        <button type="button" onClick={this.getCountryCode}>
          Search
        </button>

        <div>
          <Result countryName={this.state.value} populationData={this.props.currentPopulationData} emissionsData={this.props.currentEmissionsData}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPopulationData: state.Filter.currentPopulationData,
    currentEmissionsData:state.Filter.currentEmissionsData,
    allCountries: state.Filter.allCountries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountryCode: (country, year) =>
      dispatch(actions.getCountry(country, year)),
    onGetAllCountries: () => dispatch(actions.getAllCountries())
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
