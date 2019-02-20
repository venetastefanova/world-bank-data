import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import * as actions from "../store/actions/actions";
import styles from "./BiggestEmitters/BiggestEmitters.module.css";

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
    country: "",
    countryCode: "",
    visible: false
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
    console.log(this.props.years);
  }

  getCountryCode = () => {
    const code = this.props.allCountries.find(
      country => country.name === this.state.value
    );
    //checks if country input is empty
    this.state.value === undefined ||
    this.state.value === null ||
    this.state.value === ""
      ? alert("Please select a country!")
      : this.setState({
          countryCode: code.id,
          country: code.name
        });
    //cheks if start year value is smaller
    this.state.year1 > this.state.year2
      ? alert("Second year value should be bigger than the first") //checks if years are empty
      : (this.state.year1 === undefined && this.state.year2 === undefined) ||
        (this.state.year1 === null && this.state.year2 === null) ||
        (this.state.year1 === "" && this.state.year2 === "")
      ? alert("Please select a year interval!")
      : this.props.onGetCountryDataForIntervalYears(
          code.id,
          this.state.year1,
          this.state.year2
        );
  };
  getValueYear1 = e => {
    this.setState({
      year1: e.target.value
    });
  };
  getValueYear2 = e => {
    this.setState({
      year2: e.target.value
    });
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

    let options = {
      animationEnabled: true,
      title: {
        text: `Population vs. Emissions in ${this.state.country} between ${
          this.state.year1
        } and ${this.state.year2}`
      },
      axisY: {
        title: "Number of Customers",
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "Population",
          showInLegend: true,
          dataPoints: []
        },
        {
          type: "spline",
          name: "Emissions",
          showInLegend: true,
          dataPoints: []
        }
      ]
    };

    console.log(this.props.populationData);
    if (this.props.populationData && this.props.emissionsData) {
      this.props.populationData.forEach(countryPopulation => {
        console.log(countryPopulation);
        options.data[0].dataPoints.push(countryPopulation);
      });
      this.props.emissionsData.forEach(emissionsData => {
        console.log(emissionsData);
        options.data[1].dataPoints.push(emissionsData);
      });
    }
    // console.log(options)

    return (
      <div className={styles.Wrapper}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <select onChange={this.getValueYear1}><option value="">Year</option>{year}</select> -
        <select onChange={this.getValueYear2}><option value="">Year</option>{year}</select>
        <button type="button" onClick={this.getCountryCode}>
          Search
        </button>
        <div className={styles.Chart}>
          {this.props.visible === true ? (
            <CanvasJSReact.CanvasJSChart
              options={options}
              /* onRef = {ref => this.chart = ref} */
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    populationData: state.IntervalOfYears.populationData,
    emissionsData: state.IntervalOfYears.emissionsData,
    allCountries: state.Filter.allCountries,
    visible: state.IntervalOfYears.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountryDataForIntervalYears: (country, year1, year2) =>
      dispatch(
        actionsIntervalOfYears.getCountryDataForIntervalYears(
          country,
          year1,
          year2
        )
      ),
    onGetAllCountries: () => dispatch(actions.getAllCountries())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IntervalOfYears)
);
