import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
          <ul className={this.state.opened ? styles.Active : styles.MainNav}>
            <li>
              <NavLink to={"/"} exact activeClassName={styles.ActiveButton} className={styles.NavLinks}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/single-country-data"} activeClassName={styles.ActiveButton}  className={styles.NavLinks}>
                Individual country
              </NavLink>
            </li>
            <li>
              <NavLink to={"/near-me"} activeClassName={styles.ActiveButton} className={styles.NavLinks}>
                Near me
              </NavLink>
            </li>
            <li>
              <NavLink to={"/biggest-emitters"} activeClassName={styles.ActiveButton}  className={styles.NavLinks}>
                Biggest emitters
              </NavLink>
            </li>
            <li>
              <NavLink to={"/world-power"} activeClassName={styles.ActiveButton} className={styles.NavLinks}>
                World's superpowers
              </NavLink>
            </li>
            <li>
              <NavLink to={"/interval-of-years"} activeClassName={styles.ActiveButton}  className={styles.NavLinks}>
                Interval of years
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
