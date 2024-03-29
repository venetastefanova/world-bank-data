import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//components and actions imports
import * as globalActions from "../../store/actions/globalActions";
import * as actionsNearMe from "../../store/actions/NearMe";
import Autosuggest from "react-autosuggest";
import YearPicker from "../../components/YearPicker/YearPicker";
import SearchButton from "../../components/SearchButton/SearchButton";
import Graph from "../../components/Graph/Graph";
import styles from "./NearMe.module.css";

class NearMe extends Component {
  state = {
    year1: "",
    year2: "",
    value: "",
    suggestions: [],
    country: "",
    countryCode: "",
    region: "",
    visible: false,
    showPopulationSpline: false
  };
  componentWillUnmount() {
    this.props.onResetState();
  }

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

  componentDidMount() {
    this.props.onGetAllCountries();
  }

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
        : this.props.onGetCountryInput(
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
  //show or hide the population spline
  showPopulation = e => {
    this.setState(prevState => ({
      showPopulationSpline: !prevState.showPopulationSpline
    }));
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
        text: `Population vs. Emissions in ${this.props.region} between ${
          this.state.year1
        } and ${this.state.year2}`
      },
      axisY: {
        title: "Values",
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

    //map data after props are received
    if (this.props.emissionsData) {
      this.props.emissionsData.forEach(emissionsData => {
        options.data[1].dataPoints.push(emissionsData);
      });
    }
    if (this.state.showPopulationSpline) {
      this.props.populationData.forEach(countryPopulation => {
        options.data[0].dataPoints.push(countryPopulation);
      });
    }

    return (
      <div className={styles.Wrapper}>
        <div className={styles.Division}>
          <p>
            Select the country that you live in and the interval of years.
            <br />
            The resultlt is about to show you an average data for the specific
            region your country belongs to.
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
            <YearPicker
              selected={this.getValueYear1}
              years={this.props.years}
            />
            <span>-</span>
            <YearPicker
              selected={this.getValueYear2}
              years={this.props.years}
            />
          </div>
          <SearchButton clicked={this.getCountryCode} />
        </div>
        <div className={styles.Division}>
          <Graph
            showPopulation={this.showPopulation}
            visible={this.props.visible}
            options={options}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    populationData: state.NearMe.populationData,
    emissionsData: state.NearMe.emissionsData,
    allCountries: state.IndividualCountry.allCountries,
    region: state.NearMe.region,
    visible: state.NearMe.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountryInput: (country, year1, year2) =>
      dispatch(actionsNearMe.getCountryInput(country, year1, year2)),
    onGetAllCountries: () => dispatch(globalActions.getAllCountries()),
    onResetState: () => dispatch(globalActions.resetReduxState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NearMe)
);
