import React from "react";

const SearchButton = props => {
  return (
    <div>
      <button type="button" onClick={props.clicked}>
        Get data!
      </button>
    </div>
  );
};

export default SearchButton;
