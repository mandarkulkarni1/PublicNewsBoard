import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const ApproveNews = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  async function fetching() {
    const token = sessionStorage.getItem("token");
    const url = "http://localhost:8080/admin/toBeApprov";
    const response = await fetch(url, {
      method: "GET",
      headers: { token: token },
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
      console.log(data);
    } else {
      history.push("/login");
    }
  }, [data, history]);

  function handleClick(id) {
    history.push("/adminNews/" + id);
  }

  function reject(id, rid, title) {
    const token = sessionStorage.getItem("token");
    Swal.fire({
      title: "Reason to Reject News",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        if (!login) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Field Can't be blank ",
          });
        } else {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!",
          }).then((result) => {
            const body = {
              newsId: id,
              reporterId: rid,
              reason: login,
              title: title,
            };
            axios.post("http://localhost:8080/admin/rejected", body, {
              headers: { token: token },
            });

            if (result.isConfirmed) {
              Swal.fire(
                "Rejected!",
                "Post has been Rejected .",
                "Rejection success"
              ).then(() => {
                fetching();
              });
            }
          });
        }
      },
    });
  }

  function approve(id, rid, title) {
    const token = sessionStorage.getItem("token");
    const body = {
      newsId: id,
      reporterId: rid,
      title: title,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:8080/admin/accepted", body, {
          headers: { token: token },
        });
        Swal.fire("Approved", "Post has been approved.", "success").then(() => {
          fetching();
        });
      }
    });
  }

  return (
    <div>
      <AdminNavbar />
      {data.length === 0 ? (
        <div className="container" style={{ textAlign: "center" }}>
          {" "}
          <h3>
            <br />
            <br />
            <b>No Data</b>
          </h3>
        </div>
      ) : (
        <div>
          {" "}
          <div className="container">
            <div className="row">
              <div className="col-md-11 col-lg-11 mx-auto">
                <h4 className="text-info" style={{ textAlign: "center" }}>
                  News to Be Approved
                </h4>
                <table className="table  table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Title <span>&nbsp;</span>
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Id <span>&nbsp;</span>
                        <i className="fa fa-id-card" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        View News{" "}
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Approve{" "}
                        <i className="fa fa-location-arrow" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Reject{" "}
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((repo, index) => {
                      return (
                        <tr key={repo.newsId}>
                          <th scope="row">{index + 1}</th>
                          <td>{repo.title}</td>
                          <th scope="row">{repo.newsId}</th>

                          <td>
                            <button
                              className="btn btn-link"
                              onClick={() => {
                                return handleClick(repo.newsId);
                              }}
                            >
                              {" "}
                              View News{" "}
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                return approve(
                                  repo.newsId,
                                  repo.reporterId,
                                  repo.title
                                );
                              }}
                            >
                              {" "}
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
                                return reject(
                                  repo.newsId,
                                  repo.reporterId,
                                  repo.title
                                );
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
            </div>
          </div>
        </div>
      )}
    </div>
    /*<React.Fragment>
      <div>
        
      </div>
                </React.Fragment>*/
  );
};

export default ApproveNews;
