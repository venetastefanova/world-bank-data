import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//components and actions imports
import styles from "./IntervalOfYears.module.css";
import * as globalActions from "../../store/actions/globalActions";
import * as actionsIntervalOfYears from "../../store/actions/IntervalOfYears";
import Autosuggest from "react-autosuggest";
import YearPicker from "../../components/YearPicker/YearPicker";
import SearchButton from "../../components/SearchButton/SearchButton";
import Graph from "../../components/Graph/Graph";

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

  componentDidMount() {
    this.props.onGetAllCountries();
  }

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

  //validates the data and sends it to redux
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

      //cheks if start year value is smaller
      this.state.year1 > this.state.year2
        ? alert("Second year value should be bigger than the first") //checks if years are empty
        : (this.state.year1 === undefined && this.state.year2 === undefined) ||
          (this.state.year1 === null && this.state.year2 === null) ||
          (this.state.year1 === "" && this.state.year2 === "") ||
          (this.state.year1 === undefined || this.state.year2 === undefined) ||
          (this.state.year1 === null || this.state.year2 === null) ||
          (this.state.year1 === "" || this.state.year2 === "")
        ? alert("Please select a year interval!")
        : this.props.onGetCountryDataForIntervalYears(
            code.id,
            this.state.year1,
            this.state.year2
          );
    }
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

    let options = {
      animationEnabled: true,
      title: {
        text: `Population vs. Emissions in ${this.state.country} between ${
          this.state.year1
        } and ${this.state.year2}`
      },
      axisY: {
        title: "Value of Emissions & Population",
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

    if (this.props.populationData && this.props.emissionsData) {
      this.props.populationData.forEach(countryPopulation => {
        options.data[0].dataPoints.push(countryPopulation);
      });
      this.props.emissionsData.forEach(emissionsData => {
        options.data[1].dataPoints.push(emissionsData);
      });
    }

    return (
      <div className={styles.Wrapper}>
        <p>
          Check a specific country's situation for specific interval of years.
          <br /> You can see the relation between population and carbon dioxide
          emissions.
          <br />
          <br />
          <i>
            <b>Note</b>: Results showing 0 as a value are assumed as such, due
            to the lack of information given for the specific year.
          </i>
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
          <YearPicker selected={this.getValueYear1} years={this.props.years} />
          <span>-</span>
          <YearPicker selected={this.getValueYear2} years={this.props.years} />
        </div>
        <SearchButton clicked={this.getCountryCode} />
        <Graph visible={this.props.visible} options={options} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    populationData: state.IntervalOfYears.populationData,
    emissionsData: state.IntervalOfYears.emissionsData,
    allCountries: state.IndividualCountry.allCountries,
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
    onGetAllCountries: () => dispatch(globalActions.getAllCountries()),
    onResetState: () => dispatch(globalActions.resetReduxState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IntervalOfYears)
);
