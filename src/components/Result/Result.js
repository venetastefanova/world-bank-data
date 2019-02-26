import React, { Component } from "react";

class Result extends Component {
  render() {
    return <div>
       {this.props.populationData !== null && this.props.emissionsData
            ?  <p>Population: {this.props.populationData[0].value !== null 
                                ? this.props.populationData[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                : "sorry, we do not have this information"}</p>
            : null}   
        {this.props.emissionsData !== null && this.props.populationData !== null 
            ? <p>Carbon dioxide emissions: {this.props.emissionsData[0].value !== null 
                                ? this.props.emissionsData[0].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                : "sorry, we do not have this information"}</p>
            : null}       
        </div>;
  }
}

export default Result;