import React, { Component } from "react";
import styles from './BiggestEmitters.module.css';

import { withRouter } from "react-router-dom";
import * as actionsFilter from "../store/actions/actions";
import * as actionsEmitters from "../store/actions/BiggestEmitters";
import { connect } from "react-redux";
import CanvasJSReact from "../canvasjs.react";

class BiggestEmitters extends Component {
  state = {
    year: ""
  };
  componentDidMount() {
    this.props.onGetAllYears();
  }

  getYearValue = e => {
    this.setState({
      year: e.target.value
    });
    console.log(e.target.value);
  };

  getData = () => {
    console.log("click");
    this.props.onGetCountries(this.state.year);
  };
  render() {
    const year = this.props.years.map((year, index) => {
      return (
        <option key={index} value={year}>
          {year}
        </option>
      );
    });
    const options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Apple", y: 10 },
            { label: "Orange", y: 15 },
            { label: "Banana", y: 25 },
            { label: "Mango", y: 30 },
            { label: "Grape", y: 28 }
          ]
        }
      ]
    };

    return (
      <div className={styles.Wrapper}>
        <div>
          <select onChange={this.getYearValue}>{year}</select>
        </div>
        <div>
          <button type="button" onClick={this.getData}>
            Search
          </button>
        </div>
        <div>
          <CanvasJSReact.CanvasJSChart
            options={options}
            /* onRef = {ref => this.chart = ref} */
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    years: state.Filter.years
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllYears: () => dispatch(actionsFilter.getAllYears()),
    onGetCountries: year => dispatch(actionsEmitters.getData(year))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BiggestEmitters)
);
