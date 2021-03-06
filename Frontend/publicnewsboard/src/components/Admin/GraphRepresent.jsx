import React, { Component } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { withRouter } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

class GraphRepresent extends Component {
  state = { state: [] };
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      const url = "http://localhost:8080/admin/mostlyReadNews";
      var promise = fetch(url, { method: "GET", headers: { token: token } });
      console.log(promise);
      promise.then((response) => {
        var promise2 = response.json();
        promise2.then((prod) => {
          console.log(prod);
          this.setState({ state: prod });
        });
      });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="container">
                <div className="col-md-12 p-1 border border-info rounded">
                  <Bar
                    data={this.state.state}
                    options={{
                      title: {
                        display: true,
                        text: "News Read Count Graph",
                        fontSize: 6,
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                      legend: {
                        display: false,
                        position: "center",
                      },
                    }}
                  />
                </div>
          <div className="row ">
            <div className="col-md-7 p-1 border border-info rounded">
              <Pie
                data={this.state.state}
                options={{
                  title: {
                    display: true,
                    text: "News Read Count Graph",
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
            <div className="col-md-5 p-1 border border-info rounded">
              <Doughnut
                data={this.state.state}
                options={{
                  title: {
                    text: "News Read Count Graph",
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GraphRepresent);
