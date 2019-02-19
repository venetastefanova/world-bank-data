import React, { Component } from "react";
import styles from "./BiggestEmitters.module.css";

import { withRouter } from "react-router-dom";
import * as actionsFilter from "../store/actions/actions";
import * as actionsEmitters from "../store/actions/BiggestEmitters";
import { connect } from "react-redux";
import CanvasJSReact from "../canvasjs.react";

class BiggestEmitters extends Component {
  state = {
    year: "",
    visible: false,
    result: []
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
    // this.setState({visible:true})
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
      title: {
        text: `Top 10 emitters for ${this.state.year}`
      },
      data: [
        {
          type: "column",
          dataPoints: []
        }
      ]
    };

    if (this.props.biggestEmitters) {
      this.props.biggestEmitters.forEach(country => {
        console.log(country);
        options.data[0].dataPoints.push(country);
      });
    }

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
    years: state.Filter.years,
    biggestEmitters: state.BiggestEmitters.data,
    visible: state.BiggestEmitters.visible
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
