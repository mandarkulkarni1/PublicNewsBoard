import React, { Component } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

class GraphRepresent extends Component {
  state = { state: [] };
  componentDidMount() {
    const url = "http://localhost:8080/admin/mostlyReadNews";
    var promise = fetch(url, { method: "GET" });
    promise.then((response) => {
      var promise2 = response.json();
      promise2.then((prod) => {
        console.log(prod);
        this.setState({ state: prod });
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-9 mx-auto">
            <Bar
              data={this.state.state}
              options={{
                title: {
                  display: false,
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
          <br />
          <br />
          <div className="col-md-5 mx-auto">
            <Pie
              data={this.state.state}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 30,
                },
                legend: {
                  display: true,
                  position: "left",
                },
              }}
            />
          </div>
          <br />
          <br />
          <br />
          <div className="col-md-5 mx-auto">
            <Doughnut
              data={this.state.state}
              options={{
                title: {
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GraphRepresent;