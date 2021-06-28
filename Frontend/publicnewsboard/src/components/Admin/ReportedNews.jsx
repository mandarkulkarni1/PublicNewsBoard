import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
const ReportedNews = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  async function fetching() {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/admin/reportedNews";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: token },
    });
    const { data } = await response.json();
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("role") === "admin"
    ) {
      fetching();
    } else {
      history.push("/login");
    }
  }, []);

  function handleClick(id) {
    history.push("/allReports/" + id);
  }

  function viewNews(id) {
    history.push("/adminNews/" + id);
  }

  function action(newsId) {
    const token = sessionStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:8080/admin/takeAction/" + newsId, {
          method: "GET",
          headers: { token: token },
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          () => {
            fetching();
          }
        );
      }
    });
  }

  function ignore(newsId) {
    const token = sessionStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, ignore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:8080/admin/ignore/" + newsId, {
          method: "GET",
          headers: { token: token },
        });
        Swal.fire("Ignored!", "Your file has been ignored.", "success").then(
          () => {
            fetching();
          }
        );
      }
    });
  }

  return (
    <React.Fragment>
      <AdminNavbar />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-11 col-lg-11 mx-auto">
              {data.length === 0 ? (
                <div style={{ textAlign: "center" }}>
                  <br />
                  <br />
                  <b>No Data Available</b>
                </div>
              ) : (
                <div>
                  <h4 className="text-info" style={{ textAlign: "center" }}>
                    Reported News
                  </h4>
                  <table className="table  table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                          News Id{" "}
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </th>

                        <th scope="col">
                          View News{" "}
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </th>
                        <th scope="col">
                          Report Comments{" "}
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </th>
                        <th scope="col">
                          Report Count{" "}
                          <i
                            className="fa fa-location-arrow"
                            aria-hidden="true"
                          ></i>
                        </th>
                        <th scope="col">
                          Ignore{" "}
                          <i className="fa fa-check-square" aria-hidden="true"></i>
                        </th>
                        <th scope="col">
                          Action{" "}
                          <i className="fa fa-check-square" aria-hidden="true"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((repo, index) => {
                        return (
                          <tr key={repo.newsId}>
                            <th scope="row">{index + 1}</th>
                            <th scope="row">{repo.newsId}</th>

                            <td>
                              <button
                                className="btn btn-link"
                                onClick={() => {
                                  return viewNews(repo.newsId);
                                }}
                              >
                                {" "}
                                View News{" "}
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </button>
                            </td>
                            <th scope="row">{repo.reportCount}</th>
                            <th scope="row">
                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  return handleClick(repo.newsId);
                                }}
                              >
                                View Comment
                              </button>
                            </th>
                            <th>
                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  return ignore(repo.newsId);
                                }}
                              >
                                {" "}
                                <i
                                  className="fa fa-check-square-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </th>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  return action(repo.newsId);
                                }}
                              >
                                {" "}
                                <i className="fa fa-times" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReportedNews;
