import React, { Component } from "react";
import Router from "next/router";

class AutoLogout extends Component {
  constructor(props) {
    super(props);
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    this.events.forEach((event) => {
      if (typeof window !== "undefined") {
        window.addEventListener(event, this.resetTimeout);
      }
    });
    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, 29 * 60 * 1000);
    this.logoutTimeout = setTimeout(this.logout, 30 * 60 * 1000);
  }

  resetTimeout(event) {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    console.log("You will be logged out automatically in 30 minutes.");
  }

  logout() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("zyen_token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("firstName");
      localStorage.removeItem("tempPass");
      Router.push("/login");
    }
    this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();
    this.events.forEach((event) => {
      if (typeof window !== "undefined")
        window.removeEventListener(event, this.resetTimeout);
    });
  }

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default AutoLogout;
