import React, { Component } from "react";
import { withRouter } from "react-router";

class CheckUser extends Component {
  redirect() {
    this.props.history.push("/login");
  }

  componentDidMount() {
    console.log("Hello");
    if (true) {
      console.log("Hello 2");
      this.redirect();
    }
  }
  render() {
    return <div>Hello Buddy</div>;
  }
}

export default withRouter(CheckUser);
