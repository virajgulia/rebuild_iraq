import React, { Component } from "react";
import Link from "../../utils/ActiveLink";
import Router from "next/router";
import Image from "next/image";


class Navbar extends Component {
  // Navbar
  _isMounted = false;
  state = {
    display: false,
    collapsed: true,
    isLoggedin: false,
    isAdmin: false,
    firstName: "",
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    window.scrollTo(0, 0);

    let jwt_token = localStorage.getItem("zyen_token");
    if (jwt_token) {
      this.setState({ isLoggedin: true });
    }
    if (localStorage.getItem("isAdmin")) {
      this.setState({ isAdmin: localStorage.getItem("isAdmin") });
    }
    if (localStorage.getItem("firstName")) {
      this.setState({ firstName: localStorage.getItem("firstName") });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLogout = () => {
    localStorage.removeItem("zyen_token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("tempPass");
    Router.push("/login");
  };

  render() {
    const { collapsed, isLoggedin, isAdmin, firstName } = this.state;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";

    return (
      <React.Fragment>
        <div id="navbar" className="navbar-area">
          <nav className="navbar navbar-expand-md navbar-light">
            <div className="container nav_container">
              <Link legacyBehavior href="/">
                <a className="navbar-brand">
                  <Image 
                    src="/finalLogoFoot.png"
                    alt="logo"
                    width={70} height={50}
                  />
                </a>
              </Link>

              <button
                onClick={this.toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link legacyBehavior href="/">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/tenders">
                      <a className="nav-link">Tenders</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/news">
                      <a className="nav-link">News page</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/about-us">
                      <a className="nav-link">About Us</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/contact-us">
                      <a className="nav-link">Contact</a>
                    </Link>
                  </li>
                  {isAdmin == "false" && isLoggedin && (
                    <li className="nav-item">
                      <Link legacyBehavior href="/Control-Panel/controlHome">
                        <a className="nav-link">Control Panel</a>
                      </Link>
                    </li>
                  )}
                  {isAdmin === "true" && (
                    <li className="nav-item">
                      <Link legacyBehavior href="/dash">
                        <a className="nav-link">Dashboard</a>
                      </Link>
                    </li>
                  )}

                  {/* {isAdmin === "true" ? null : isLoggedin ? (
                    <li className="nav-item">
                      <Link legacyBehavior href="/profile">
                        <a className="nav-link">Profile</a>
                      </Link>
                    </li>
                  ) : null} */}
                </ul>

                <div
                  className={`others-options ${
                    isLoggedin ? "user-name-login" : ""
                  }`}
                  style={{ marginBottom: 25 }}
                >
                  {isAdmin == "false" && isLoggedin && (
                    <ul className="navbar-nav m-auto">
                      <li className="nav-item logoOutBtn">
                        <a className="nav-a">
                          Welcome {firstName && firstName.split(" ")[0]}!
                        </a>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link legacyBehavior href="/Control-Panel/controlHome">
                              <a className="nav-a" style={{ color: "white" }}>
                                Control Panel
                              </a>
                            </Link>{" "}
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="../Control-Panel/controlPanelAccount">
                              <a className="nav-a" style={{ color: "white" }}>
                                My Account
                              </a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="../Control-Panel/control-panel-alert">
                              <a className="nav-a" style={{ color: "white" }}>
                                Alert Profile
                              </a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="../Control-Panel/ControlTender">
                              <a className="nav-a" style={{ color: "white" }}>
                                Tenders
                              </a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="../Control-Panel/ControlNews">
                              <a className="nav-a" style={{ color: "white" }}>
                                News
                              </a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="../Control-Panel/ControlHelp">
                              <a className="nav-a" style={{ color: "white" }}>
                                Help
                              </a>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link legacyBehavior href="/">
                              <a
                                className="nav-a"
                                onClick={() => this.onLogout()}
                                style={{ color: "white" }}
                              >
                                Logout
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )}
                  {
                    isAdmin == "true" && isLoggedin && (
                      <div>
                        <a
                          className="default-btn"
                          onClick={() => this.onLogout()}
                        >
                          Log Out
                          <i className="bx bx-log-out-circle"></i>
                        </a>
                        <h3>Welcome {firstName && firstName.split(" ")[0]}!</h3>
                      </div>
                    )
                    //     : (
                    //     <a className="default-btn" href="/login">
                    //       Log In
                    //       <i className="bx bx-log-in-circle"></i>
                    //     </a>
                    //   )
                  }
                  {!isLoggedin && (
                    <div>
                      <a className="default-btn" href="/login">
                        Log In
                        <i className="bx bx-log-in-circle"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
