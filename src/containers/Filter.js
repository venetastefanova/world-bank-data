import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";

class Filter extends Component {
    state={
        country: ""
    }
  componentDidMount() {
    this.props.onGetAllCountries();
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
        <button onClick={()=>this.props.onGetCountry(this.state.country)} type="button">Search</button>
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
    onGetCountry: (country) => dispatch(actions.getCountry(country)),
    onGetAllCountries: () => dispatch(actions.getAllCountries())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
