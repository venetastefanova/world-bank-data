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
    result: []
  };

  getYearValue = e => {
    this.setState({
      year: e.target.value
    });
    console.log(e.target.value);
  };

  getData = () => {
    !this.state.year
    ? alert("Please select a year!") //checks if years are empty
    : this.state.year === undefined ||
      this.state.year === null ||
      this.state.year === ""
    ? alert("Please select a year!")
    : this.props.onGetCountries(this.state.year);
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

      // console.log(options)
    }

    return (
      <div className={styles.Wrapper}>
        <div>
          <select onChange={this.getYearValue}><option value="">Year</option>{year}</select>
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
    biggestEmitters: state.BiggestEmitters.data,
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
