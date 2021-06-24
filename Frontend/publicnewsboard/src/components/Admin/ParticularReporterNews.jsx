import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ParticularReporterNews = ({ match: { params } }) => {
  const [dat, setData] = useState([]);
  const history = useHistory();

  async function fetching() {
    const url = "http://localhost:8080/admin/getParticularNews/" + params.id;
    const response = await fetch(url);
    const { data } = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    fetching();
  });

  function handleClick(id) {
    history.push("/adminNews/" + id);
  }
  return (
    <div className="container">
      <div className="row">
        {dat.length === 0 || dat.toString() === "" ? (
          <div className="col-md-8">
            {" "}
            <br />
            <div style={{ textAlign: "center" }}>
              {" "}
              <b>No News to Display</b>
            </div>
          </div>
        ) : (
          <div className="col-md-8">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th> Title</th>
                  <th>News Id</th>
                  <th>Read News</th>
                  <th>Location</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {dat.map((repo, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{repo.title}</td>
                      <td>{repo.newsId}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            return handleClick(repo.newsId);
                          }}
                          className="btn btn-info"
                        >
                          View News
                        </button>
                      </td>

                      <td>{repo.city}</td>
                      <td>{repo.views}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticularReporterNews;
