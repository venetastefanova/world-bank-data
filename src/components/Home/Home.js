import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.Wrapper}>
      <p>
        Climate change and carbon dioxide emissions are one of the biggest
        challenges for the future of humanity. As the population of the world
        increases, so do emissions. The application allows you to search carbon
        dioxide emissions by location. Additionally, you can filter the data in
        different ways, such as:
      </p>
      <ul>
        <li>Check the population and the emissions for specific country</li>
        <li>
          Find out which countries are the biggest carbon dioxide emitters
        </li>
        <li>Check what is the situation in the region where you live</li>
        <li>
          Get to know how the emissions situation has changed during specific
          period of time
        </li>
        <li>
          Find out what big of a role the world most powerful countries play in the carbon dioxide emissions each year
        </li>
      </ul>
    </div>
  );
};

export default Home;
