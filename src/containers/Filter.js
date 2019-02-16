import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

class Filter extends Component {
  state = {
    value: "",
    suggestions: []
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
  getSuggestionValue = suggestion =>{

    return suggestion.name;
  }

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
  }

  getCountryCode = ()=> {
    const code = this.props.allCountries.find(country=>country.name===this.state.value)
    console.log(code)
  }

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.

    const inputProps = {
    placeholder: "Country",
      value,
      onChange: this.onChange
    };
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
        <button type="button" onClick={this.getCountryCode}>Search</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentData: state.currentData,
    allCountries: state.allCountries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountry: country => dispatch(actions.getCountry(country)),
    onGetAllCountries: () => dispatch(actions.getAllCountries())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
