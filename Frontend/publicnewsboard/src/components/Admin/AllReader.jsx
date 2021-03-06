import React from "react";
import { Component } from "react";
import { withRouter } from "react-router";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "bootstrap/js/src/collapse.js";

class AllReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      const token = sessionStorage.getItem("token");
      console.log(token);
      const url = "http://localhost:8080/admin/allReader";
      var promise = await fetch(url, {
        method: "GET",
        headers: { token: token },
      });
      var prod = await promise.json();
      this.setState({
        data: prod.data,
      });
      console.log(this.state.data);
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div>
        <AdminNavbar />
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 col-lg-8 mx-auto"
              style={{ textAlign: "center" }}
            >
              <br />
              <h4 className="text-info" style={{ textAlign: "center" }}>
                All Reader
              </h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Reader Name</th>

                    <th>Reader Email</th>
                    <th>Reader Id</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((repo, index) => {
                    return (
                      <tr key={repo.readerId}>
                        <th> {index + 1} </th>
                        <th>{repo.userName}</th>
                        <td>{repo.email}</td>
                        <td>{repo.readerId}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AllReader);
