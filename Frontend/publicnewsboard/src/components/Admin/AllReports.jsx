import React from "react";
import { Component } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

class AllReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async viewUser(id) {
    const token = sessionStorage.getItem("token");
    const data = await fetch("http://localhost:8080/admin/Reader/" + id, {
      method: "GET",
      headers: { token: token },
    });
    const response = await data.json();
    const value = response.data;
    const htmldata =
      "<b>Name : -</b>  <b>" +
      value[0].userName +
      "</b><br><b>Email :-</b> <b>" +
      value[0].email +
      "</b>";
    await Swal.fire({
      title: "Reported Person Info",
      html: htmldata,
      imageUrl: "https://static.thenounproject.com/png/1500522-200.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }

  componentDidMount = async () => {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      const token = sessionStorage.getItem("token");
      const url =
        "http://localhost:8080/admin/seeReport/" + this.props.match.params.id;
      var promise = await fetch(url, {
        method: "GET",
        headers: { token: token },
      });

      var prod = await promise.json();

      console.log("Coming Data" + prod.data);
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
            <div className="col-md-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Report Issue</th>

                    <th>User Id</th>
                    <th>View User</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((repo, index) => {
                    return (
                      <tr key={repo.readerId}>
                        <td>{index + 1}</td>
                        <td>{repo.category}</td>

                        <td>{repo.readerId}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              return this.viewUser(repo.readerId);
                            }}
                            className="btn btn-info"
                          >
                            View user
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
      </div>
    );
  }
}

export default withRouter(AllReports);
