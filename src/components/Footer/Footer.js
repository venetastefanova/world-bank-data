import React from "react";
import styles from "./Footer.module.css";
import linkedinLogo from "../../linkedin.png";

const Footer = () => (
  <div className={styles.Wrapper}>
    <div>
      <h2>Veneta Stefanova 2019</h2>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/venetas/" rel="noopener noreferrer" target="_blank">
        <img className={styles.Linkedin} src={linkedinLogo} alt="linkedin" />
      </a>
    </div>
  </div>
);

export default Footer;
