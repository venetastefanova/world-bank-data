import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//components and actions imports
import * as actionsEmitters from "../../store/actions/BiggestEmitters";
import * as actions from "../../store/actions/actions";
import styles from "./BiggestEmitters.module.css";
import SearchButton from "../../components/SearchButton/SearchButton";
import YearPicker from "../../components/YearPicker/YearPicker";
import Graph from "../../components/Graph/Graph";

class BiggestEmitters extends Component {
  state = {
    year: "",
    visible: false,
    result: [],
    showPopulationSpline: false
  };
  componentWillUnmount() {
    this.props.onResetState();
  }

  getYearValue = e => {
    this.setState({
      year: e.target.value
    });
  };

  getData = () => {
    !this.state.year
      ? alert("Please select a year!") //checks if year is empty
      : this.state.year === undefined ||
        this.state.year === null ||
        this.state.year === ""
      ? alert("Please select a year!")
      : this.props.onGetCountries(this.state.year);
  };

  //show population spline
  showPopulation = e => {
    this.setState(prevState => ({
      showPopulationSpline: !prevState.showPopulationSpline
    }));
  };
  render() {
    let options = {
      animationEnabled: true,
      title: {
        text: `The top 10 biggest emitters countries in ${this.state.year}`
      },
      axisY: {
        title: "Emissions",
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "emissions",
          showInLegend: true,
          dataPoints: []
        },
        {
          type: "spline",
          name: "population",
          showInLegend: true,
          dataPoints: []
        }
      ]
    };

    //only if data is returned to redux, populate the data
    if (this.props.emissions && this.props.populations) {
      let result = [];
      var test = this.props.populations;
      this.props.emissions.forEach(function(element) {
        result.push({
          label: element.label,
          emissions: element.emissions,
          populations: test.filter(e => e.label === element.label)
        });
      });

      var emissions = [];
      var populations = [];
      result.map(emission => {
        return emissions.push({
          label: emission.label,
          y: emission.emissions
        });
      });
      result.map(population => {
        return population.populations.forEach(item => {
          populations.push({
            label: item.label,
            y: item.populations
          });
        });
      });
      emissions.forEach(emissionsData => {
        options.data[0].dataPoints.push(emissionsData);
      });
    }
    if (this.state.showPopulationSpline) {
      populations.forEach(countryPopulation => {
        options.data[1].dataPoints.push(countryPopulation);
      });
    }
    return (
      <div className={styles.Wrapper}>
        <p>
          Select a year below in order to see which are the top 10 biggest
          emitters country of carbon dioxide.
          <br />
          <br />
          <i>
            <b>Note</b>: Results showing 0 as a value are assumed as such, due
            to the lack of information given for the specific year.
          </i>
        </p>
        <YearPicker selected={this.getYearValue} years={this.props.years} />
        <SearchButton clicked={this.getData} />
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
    emissions: state.BiggestEmitters.emissions,
    populations: state.BiggestEmitters.populations,
    visible: state.BiggestEmitters.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCountries: year => dispatch(actionsEmitters.getData(year)),
    onResetState: () => dispatch(actions.resetReduxState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BiggestEmitters)
);
