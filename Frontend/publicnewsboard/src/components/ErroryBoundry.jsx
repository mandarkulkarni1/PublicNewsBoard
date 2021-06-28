import React, { Component } from "react";

export class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1>Error Occurred, Please Contat Service Team...</h1>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}
