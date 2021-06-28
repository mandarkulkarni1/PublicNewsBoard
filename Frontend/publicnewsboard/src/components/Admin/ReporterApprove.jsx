import React, { Component } from "react";
import Swal from "sweetalert2";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
class ReporterApprove extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      const url = "http://localhost:8080/admin/approvedRepo";
      var promise = fetch(url, {
        method: "GET",
        headers: {
          token: token,
        },
      });
      promise.then((response) => {
        console.log(response);

        var promise2 = response.json();
        promise2.then((prod) => {
          console.log(prod.data);
          this.setState({ product: prod.data });
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
          {this.state.product.length === 0 ||
          this.state.product.toString === "" ? (
            <div style={{ textAlign: "center" }}>
              <br />
              <br />
              <b>No Data Available</b>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-11 col-lg-11 mx-auto">
                <h4 className="text-info" style={{ textAlign: "center" }}>
                  Reporters to Be Approved
                </h4>
                <table className="table  table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Reporter Name <span>&nbsp;</span>
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Id <span>&nbsp;</span>
                        <i className="fa fa-id-card" aria-hidden="true"></i>
                      </th>

                      <th scope="col">
                        Email <i className="fa fa-envelope" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Phone{" "}
                        <i className="fa fa-phone-square" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        City{" "}
                        <i className="fa fa-location-arrow" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Approve{" "}
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Reject{" "}
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.product.map((repo, index) => {
                      return (
                        <tr key={repo.reporterId}>
                          <th scope="row">{index + 1}</th>
                          <td>{repo.userName}</td>
                          <th scope="row">{repo.reporterId}</th>
                          <td>{repo.email}</td>
                          <td>{repo.phone}</td>
                          <td>{repo.city}</td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                this.approve(repo.userName, repo.reporterId);
                              }}
                            >
                              {" "}
                              Approve{" "}
                              <i
                                className="fa fa-check-square-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                this.reject(repo.userName, repo.reporterId);
                              }}
                            >
                              {" "}
                              Reject{" "}
                              <i
                                className="fa fa-check-square-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  approve = (name, id) => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:8080/admin/approved/" + id, {
      method: "GET",
      headers: { token: token },
    });
    Swal.fire("Approved", name + " is now Reporter", "success").then(() => {
      const url = "http://localhost:8080/admin/approvedRepo";
      var promise = fetch(url, {
        method: "GET",
        headers: { token: token },
      });
      promise.then((response) => {
        console.log(response);

        var promise2 = response.json();
        promise2.then((prod) => {
          console.log(prod.data);
          this.setState({ product: prod.data });
        });
      });
    });
  };
  reject = (name, id) => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:8080/admin/repoReject/" + id, {
      method: "GET",
      headers: { token: token },
    });
    Swal.fire(name + " is Rejected", "Rejected").then(() => {
      const url = "http://localhost:8080/admin/approvedRepo";
      var promise = fetch(url, {
        method: "GET",
        headers: { token: token },
      });
      promise.then((response) => {
        console.log(response);

        var promise2 = response.json();
        promise2.then((prod) => {
          console.log(prod.data);
          this.setState({ product: prod.data });
        });
      });
    });
  };
}

export default ReporterApprove;
