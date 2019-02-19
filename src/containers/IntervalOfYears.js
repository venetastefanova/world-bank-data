import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import * as actionsIntervalOfYears from "../store/actions/IntervalOfYears";
import { connect } from "react-redux";
import CanvasJSReact from "../canvasjs.react";

class IntervalOfYears extends Component {

  render() {
    return (
      <div>
        <p>hi</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
    //   years: state.Filter.years,
    //   biggestEmitters: state.BiggestEmitters.data,
    //   visible: state.BiggestEmitters.visible
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onGetCountryDataForIntervalYears: () => dispatch(actionsIntervalOfYears.getCountryDataForIntervalYears()),
    //   onGetCountries: year => dispatch(actionsEmitters.getData(year))
    };
  };

export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(IntervalOfYears)
  );
  