import React from "react";
import { Component } from "react";

class AllReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    const url = "http://localhost:8080/admin/allReader";
    var promise = await fetch(url, { method: "GET" });

    var prod = await promise.json();
    this.setState({
      data: prod.data,
    });
    console.log(this.state.data);
  };

  render() {
    return (
      <div className="container">
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-md-6">
            <b>All Reader</b>
            <br />
            <table class="table table-hover">
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
                    <tr>
                      <td>{index + 1}</td>
                      <td>{repo.userName}</td>

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
    );
  }
}

export default AllReader;
