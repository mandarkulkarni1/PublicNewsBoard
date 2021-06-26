import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const TotalReporter = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  async function fetching() {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/admin/totalReporter";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    const { data } = await response.json();
    setData(data);
  }
  useEffect(() => {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      fetching();
    } else {
      this.props.history.push("/login");
    }
  }, []);

  function handleClick(id) {
    console.log(id);
    history.push("/particularNews/" + id);
  }

  return (
    <React.Fragment>
      <AdminNavbar />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-11 col-lg-11 mx-auto">
              <h4 className="text-primary" style={{ textAlign: "center" }}>
                All Reporter
              </h4>
              <table class="table  table-hover">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">
                      Reporter Name{" "}
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </th>

                    <th scope="col">
                      Email <i class="fa fa-envelope" aria-hidden="true"></i>
                    </th>
                    <th scope="col">
                      Phone <i class="fa fa-envelope" aria-hidden="true"></i>
                    </th>
                    <th scope="col">
                      City{" "}
                      <i class="fa fa-location-arrow" aria-hidden="true"></i>
                    </th>
                    <th scope="col">
                      There News{" "}
                      <i class="fa fa-check-square" aria-hidden="true"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((repo, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <th scope="row">{repo.userName}</th>
                        <td>{repo.email}</td>
                        <td>{repo.phone}</td>
                        <td>{repo.city}</td>

                        <td>
                          <button
                            className="btn btn-link"
                            onClick={() => {
                              return handleClick(repo.reporterId);
                            }}
                          >
                            {" "}
                            View News{" "}
                            <i class="fa fa-eye" aria-hidden="true"></i>
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
    </React.Fragment>
  );
};

export default TotalReporter;