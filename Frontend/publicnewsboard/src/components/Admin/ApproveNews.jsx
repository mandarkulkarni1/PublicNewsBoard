import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ApproveNews = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  async function fetching() {
    const url = "http://localhost:8080/admin/toBeApprov";
    const response = await fetch(url);
    const { data } = await response.json();
    setData(data);
  }
  useEffect(() => {
    fetching();
    console.log(data);
  });

  function handleClick(id) {
    history.push("/adminNews/" + id);
  }

  function reject(id, rid, title) {
    Swal.fire({
      title: "Reson to Reject News",
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
            axios.post("http://localhost:8080/admin/rejected", {
              newsId: id,
              reporterId: rid,
              reason: login,
              title: title,
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
        axios.post("http://localhost:8080/admin/accepted", {
          newsId: id,
          reporterId: rid,
          title: title,
        });
        Swal.fire("Approved", "Post has been approved.", "success").then(() => {
          fetching();
        });
      }
    });
  }

  return (
    <div>
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
                <h4 className="text-primary" style={{ textAlign: "center" }}>
                  News to Be Approved
                </h4>
                <table class="table  table-hover">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        Title <span>&nbsp;</span>
                        <i class="fa fa-users" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Id <span>&nbsp;</span>
                        <i class="fa fa-id-card" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        View News{" "}
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Approve{" "}
                        <i class="fa fa-location-arrow" aria-hidden="true"></i>
                      </th>
                      <th scope="col">
                        Reject{" "}
                        <i class="fa fa-check-square" aria-hidden="true"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((repo, index) => {
                      return (
                        <tr>
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
                              <i class="fa fa-eye" aria-hidden="true"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
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
                                class="fa fa-check-square-o"
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
                              <i class="fa fa-times" aria-hidden="true"></i>
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
