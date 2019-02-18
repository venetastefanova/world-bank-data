import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as actionsFilter from "../store/actions/actions";
import * as actionsEmitters from "../store/actions/BiggestEmitters";
import { connect } from "react-redux";

class BiggestEmitters extends Component {
  state ={
    year: ""
  }
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
    console.log("click")
    this.props.onGetCountries(this.state.year);
  }
  render() {
    const year = this.props.years.map((year, index) => {
      return (
        <option key={index} value={year}>
          {year}
        </option>
      );
    });

    return (
      <div>
        <div>
          <select onChange={this.getYearValue}>{year}</select>
        </div>
        <div>
          <button type="button" onClick={this.getData}>
            Search
          </button>
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
    onGetCountries: (year) => dispatch(actionsEmitters.getData(year))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BiggestEmitters)
);
