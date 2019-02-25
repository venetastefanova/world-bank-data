import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationBars from "../../bars.svg";

class Navigation extends Component {
  state = {
    opened: false
  };

  toggleMobileNavigation = () => {
    this.setState(prevState => ({
      opened: !prevState.opened
    }));
  };
  render() {
    return (
      <div className={styles.Wrapper}>
        <nav className={styles.Navbar}>
          <span
            onClick={this.toggleMobileNavigation}
            className={styles.NavbarToggle}
          >
            <img
              className={styles.MenuIcon}
              src={NavigationBars}
              alt="navigationMenu"
            />
          </span>
          <span href="#" className={styles.Logo}>
            logo
          </span>
          <ul className={this.state.opened ? styles.Active : styles.MainNav}>
            <li>
              <Link to={"/"} className={styles.NavLinks}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/single-country-data"} className={styles.NavLinks}>
                Individual country
              </Link>
            </li>
            <li>
              <Link to={"/near-me"} className={styles.NavLinks}>
                Near me
              </Link>
            </li>
            <li>
              <Link to={"/biggest-emitters"} className={styles.NavLinks}>
                Biggest emitters
              </Link>
            </li>
            <li>
              <Link to={"/world-power"} className={styles.NavLinks}>
                World's superpowers
              </Link>
            </li>
            <li>
              <Link to={"/interval-of-years"} className={styles.NavLinks}>
                Interval of years
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
