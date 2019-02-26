import React, { Component } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
//components and actions imports
import * as actions from "../../store/actions/actions";
import YearPicker from "../../components/YearPicker/YearPicker";
import SearchButton from "../../components/SearchButton/SearchButton";
import Result from "../../components/Result/Result";
import styles from "./IndividualCountry.module.css";

class IndividualCountry extends Component {
  state = {
    value: "",
    suggestions: [],
    countryCode: "",
    year: ""
  };
  componentDidMount() {
    this.props.onGetAllCountries();
  }
  componentWillUnmount() {
    this.props.onResetState();
  }

  //checks if the input value matches the provided country information
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
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

  // updates the suggestions
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // clear suggestions
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  //validates the input and sends the data to redux
  getCountryCode = () => {
    const code = this.props.allCountries.find(
      country => country.name === this.state.value
    );
    if (code === undefined) {
      alert("The given input is not valid!");
    } else {
      //checks if country input is empty
      this.state.value === undefined ||
      this.state.value === null ||
      this.state.value === ""
        ? alert("Please select a country!")
        : this.setState({
            countryCode: code.id,
            country: code.name
          });
      //checks for a year selection
      !this.state.year
        ? alert("Please select a year!")
        : this.state.year === undefined ||
          this.state.year === null ||
          this.state.year === ""
        ? alert("Please select a year interval!")
        : this.props.onGetCountryCode(code.id, this.state.year);
    }
  };
  //get year selected value
  getYearValue = e => {
    this.setState({
      year: e.target.value
    });
  };

  render() {
    //passing props to auto suggest
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Country",
      value,
      onChange: this.onChange
    };

    return (
      <div className={styles.Wrapper}>
        <div className={styles.Division}>
          <p>
            You can check specific country's population and its carbon dioxide
            emissions by using the filtering options below:
          </p>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          <div className={styles.Criteria}>
            <YearPicker selected={this.getYearValue} years={this.props.years} />
            <SearchButton clicked={this.getCountryCode} />
          </div>
        </div>
        <div className={styles.Division}>
          <Result
            countryName={this.state.value}
            populationData={this.props.currentPopulationData}
            emissionsData={this.props.currentEmissionsData}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPopulationData: state.Filter.currentPopulationData,
    currentEmissionsData: state.Filter.currentEmissionsData,
    allCountries: state.Filter.allCountries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountryCode: (country, year) =>
      dispatch(actions.getCountry(country, year)),
    onGetAllCountries: () => dispatch(actions.getAllCountries()),
    onResetState: () => dispatch(actions.resetReduxState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualCountry);
