import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import styles from "./BiggestEmitters/BiggestEmitters.module.css";

import * as actionsWorldPower from "../store/actions/WorldPower";

import { connect } from "react-redux";
import CanvasJSReact from "../canvasjs.react";

class WorldPower extends Component {
  state = {
    year: "",
    visible: true
  };

  getWorldPowerCountries = () => {
    !this.state.year
      ? alert("Please select a year!") //checks if years are empty
      : this.state.year === undefined ||
        this.state.year === null ||
        this.state.year === ""
      ? alert("Please select a year interval!")
      : this.props.onGetMyCountry(this.state.year);
  };
  showPopulation = e => {
    this.setState(prevState => ({
      showPopulationSpline: !prevState.showPopulationSpline
    }));
    console.log(this.state.showPopulationSpline);
  };

  // console.log(options)
  getValue = e => {
    this.setState({
      year: e.target.value
    });
    console.log(e.target.value);
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
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: `Carbon dioxide emissions for ${this.state.year}`
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: []
        }
      ]
    };

    // console.log(this.props.populationData);
    if (this.props.emissionsData) {
      this.props.emissionsData.forEach(countryEmissions => {
        console.log(countryEmissions);
        options.data[0].dataPoints.push(countryEmissions);
      });
    }

    return (
      <div className={styles.Wrapper}>
        <select onChange={this.getValue}>
          <option value="">Year</option>
          {year}
        </select>
        <button type="button" onClick={this.getWorldPowerCountries}>
          Get data
        </button>

        <div className={styles.Chart}>
          {this.props.visible === true ? (
            <div>
              <CanvasJSReact.CanvasJSChart options={options} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    emissionsData: state.WorldPower.emissionsData,
    allCountries: state.Filter.allCountries,
    visible: state.WorldPower.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMyCountry: year => dispatch(actionsWorldPower.getMyCountry(year))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorldPower)
);
