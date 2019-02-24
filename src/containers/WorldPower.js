import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styles from "./BiggestEmitters/BiggestEmitters.module.css";
import * as actionsWorldPower from "../store/actions/WorldPower";
import YearPicker from "../components/YearPicker";
import SearchButton from "../components/SearchButton";
import Graph from '../components/Graph';

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
      : this.props.onGetCountries(this.state.year);
  };
  showPopulation = e => {
    this.setState(prevState => ({
      showPopulationSpline: !prevState.showPopulationSpline
    }));
  };

  getValue = e => {
    this.setState({
      year: e.target.value
    });
  };
  render() {
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
        options.data[0].dataPoints.push(countryEmissions);
      });
    }

    return (
      <div className={styles.Wrapper}>
        <YearPicker selected={this.getValue} years={this.props.years} />
        <SearchButton clicked={this.getWorldPowerCountries} />
        <Graph visible={this.props.visible} options={options}/>
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
    onGetCountries: year => dispatch(actionsWorldPower.getCountries(year))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorldPower)
);
