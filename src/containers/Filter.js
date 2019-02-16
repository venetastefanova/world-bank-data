import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";

class Filter extends Component {
    state={
        country: ""
    }
  componentDidMount() {
    this.props.onInitData();
  }

  inputOnChange = (e) => {
    this.setState({country:e.target.value})
    // console.log(e.target.value);
  }
  getCountryInput = () =>{
      console.log(this.state.country)
  }
  render() {
    // const all = this.props.currentData.map(index => {
    //   return <p id={index} key={index}>{index}</p>;
    // });
    return <div>
        <input onChange={this.inputOnChange}type="text" placeholder="country"/>
        <button onClick={this.getCountryInput} type="button">Search</button>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    currentData: state.currentData // comes from redux
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitData: () => dispatch(actions.initData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
