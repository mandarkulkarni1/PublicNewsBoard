import React, { Component } from "react";
import Swal from "sweetalert2";

class ReporterApprove extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    const url = "http://localhost:8080/reporters/to_be_aproved";
    var promise = fetch(url, { method: "GET" });
    promise.then((response) => {
      console.log(response);

      var promise2 = response.json();
      promise2.then((prod) => {
        console.log(prod.data);
        this.setState({ product: prod.data });
      });
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-11 col-lg-11 mx-auto">
            <h4 className="text-primary" style={{ textAlign: "center" }}>
              Reporters to Be Approved
            </h4>
            <table class="table  table-hover">
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    Reporter Name <span>&nbsp;</span>
                    <i class="fa fa-users" aria-hidden="true"></i>
                  </th>
                  <th scope="col">
                    Id <span>&nbsp;</span>
                    <i class="fa fa-id-card" aria-hidden="true"></i>
                  </th>

                  <th scope="col">
                    Email <i class="fa fa-envelope" aria-hidden="true"></i>
                  </th>
                  <th scope="col">
                    Phone <i class="fa fa-phone-square" aria-hidden="true"></i>
                  </th>
                  <th scope="col">
                    City <i class="fa fa-location-arrow" aria-hidden="true"></i>
                  </th>
                  <th scope="col">
                    Action <i class="fa fa-check-square" aria-hidden="true"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.product.map((repo, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{repo.userName}</td>
                      <th scope="row">{repo.reporterId}</th>

                      <td>{repo.email}</td>
                      <td>{repo.phone}</td>
                      <td>{repo.city}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.approve(repo.userName, repo.reporterId);
                          }}
                        >
                          {" "}
                          Approve{" "}
                          <i
                            class="fa fa-check-square-o"
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
      </div>
    );
  }
  approve = (name, id) => {
    fetch("http://localhost:8080/reporters/approved/" + id, {
      method: "GET",
    });
    Swal.fire("Approved", name + " is now Reporter", "success").then(() => {
      const url = "http://localhost:8080/reporters/to_be_aproved";
      var promise = fetch(url, { method: "GET" });
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
