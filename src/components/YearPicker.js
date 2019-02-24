import React from "react";

const YearPicker = props => {
  const year = props.years.map((year, index) => {
    return (
      <option key={index} value={year}>
        {year}
      </option>
    );
  });

  return (
    <div>
      <select onChange={props.selected}>
        <option value="">Year</option>
        {year}
      </select>
    </div>
  );
};

export default YearPicker;
