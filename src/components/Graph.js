import React from "react";
import CanvasJSReact from "../canvasjs.react";
import styles from "./Graph.module.css";

const Graph = props => {
  return (
    <div className={styles.Chart}>
      {props.visible === true ? (
        <div>
          {props.showPopulation ? (
            <div>
              <input
                onChange={props.showPopulation}
                type="checkbox"
                name="checkbox"
                id="checkbox_id"
                value="value"
              />{" "}
              <label htmlFor="checkbox_id">Show population</label>
            </div>
          ) : null}
          <CanvasJSReact.CanvasJSChart options={props.options} />
        </div>
      ) : null}
    </div>
  );
};

export default Graph;
