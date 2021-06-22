import React from "react";
import { Component } from "react";
import queryString from "query-string";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      views: "",
      image: "",
      video: "",
      category: "",
      city: "",
      locality: "",
      publiceDate: "",
      reporterName: "",
    };
  }

  componentDidMount() {
    const url = "http://localhost:8080/admin/adminNews/" + this.props.id;

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
      <div className="my-3">
        <div className="container" style={{ width: "80" }}>
          <div className="mx-5">
            <span className="text-secondary mx-1 h6">
              Category : IT/Security{this.props.id}
            </span>
            <h1>
              Why operating desktops in the cloud is the new buzzword for SMBs
            </h1>
            <div className="row">
              <div className="col-sm-6">
                <span className="text-secondary mx-1 mt-n1 h6">Delhi</span>
                <br />
                <span className="text-secondary mx-1 h6">11-07-2021</span>
              </div>
              <div className="col-sm-6">
                <button type="button" className=" btn btn-danger">
                  Fake News
                </button>{" "}
                <span>&nbsp; &nbsp;</span>
                <button
                  type="button"
                  className=" btn btn-warning"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                >
                  Report News
                </button>
                <div
                  className="modal fade"
                  id="exampleModalLong"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Reason for Report
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          style={{ width: "100%" }}
                        >
                          <option defaultValue>select Reason</option>
                          <option value="1">Violence </option>
                          <option value="2">Nudity</option>
                          <option value="3">Pornography</option>
                          <option value="4">False news</option>
                          <option value="4">Fake news</option>
                          <option value="6">others</option>
                        </select>
                        <br />
                        <br />
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <img
              src="https://one.comodo.com/blog/images/msp/how-comodo-one-can-help-msps.jpg"
              alt=""
            />
            <br />
            <br />
            <div style={{ width: "85%" }}>
              {" "}
              <span style={{ fontSize: "100%" }}>
                The term Management information system (MIS), refers to a
                computer-based methodology that equips decision makers in an
                organization with the tools to organize, evaluate and
                efficiently manage departments. The process chiefly involves in
                storing of data and generating reports that will throw light on
                the business key points to make right decisions. The MIS system
                may also include software that supports in decision making. The
                software keeps a complete record of the past and current data in
                the required format and presents it for analysis whenever it is
                needed. Besides database maintenance and decision making, the
                software comes handy in keeping a complete record of the
                hardware resources, project management applications, people
                management, and decision support systems. On the whole, it
                serves as the backbone of an organization guaranteeing smooth
                and efficient functioning.
              </span>
            </div>
            <br />
            <br />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/pWWOEcd7f6k"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <br />
            Reprted By : - Taslima nasreen
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
