import React, { Component } from "react";
import styles from "./BiggestEmitters.module.css";

import { withRouter } from "react-router-dom";
import * as actionsEmitters from "../../store/actions/BiggestEmitters";
import { connect } from "react-redux";
import CanvasJSReact from "../../canvasjs.react";

class BiggestEmitters extends Component {
  state = {
    year: "",
    visible: false,
    result: [],
    showPopulationSpline: false
  };

  getYearValue = e => {
    this.setState({
      year: e.target.value
    });
  };

  getData = () => {
    !this.state.year
      ? alert("Please select a year!") //checks if years are empty
      : this.state.year === undefined ||
        this.state.year === null ||
        this.state.year === ""
      ? alert("Please select a year!")
      : this.props.onGetCountries(this.state.year);
  };

  showPopulation = e => {
    this.setState(prevState => ({
      showPopulationSpline: !prevState.showPopulationSpline
    }));
    console.log(this.state.showPopulationSpline);
  };
  render() {
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

      console.log(emissions);
      console.log(populations);

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
        <div>
          <select onChange={this.getYearValue}>
            <option value="">Year</option>
            {year}
          </select>
        </div>
        <div>
          <button type="button" onClick={this.getData}>
            Search
          </button>
        </div>
        <div className={styles.Chart}>
          {this.props.visible === true ? (
            <div>
              <input
                onChange={this.showPopulation}
                type="checkbox"
                name="checkbox"
                id="checkbox_id"
                value="value"
              />
              <label htmlFor="checkbox_id">Show population</label>
              <CanvasJSReact.CanvasJSChart
                options={options}
                /* onRef = {ref => this.chart = ref} */
              />
            </div>
          ) : null}
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
    onGetCountries: year => dispatch(actionsEmitters.getData(year))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BiggestEmitters)
);
