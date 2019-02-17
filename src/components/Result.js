import React, { Component } from "react";

export default class Result extends Component {
  render() {
    return <div>
       {this.props.data !== null 
            ? <p>Population: {this.props.data[0].value !== null 
                                ? this.props.data[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                : "sorry, we do not have this information"}</p>
            : null}     
        </div>;
  }
}
