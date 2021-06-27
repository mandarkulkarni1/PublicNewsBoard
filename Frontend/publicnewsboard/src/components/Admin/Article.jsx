import React from "react";
import { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      views: "",
      article: "",
      image: "",
      video: "",
      category: "",
      city: "",
      locality: "",
      publiceDate: "",
      reporterName: "",
    };
  }

  componentDidMount = async () => {
    const token = sessionStorage.getItem("token");
    const url =
      "http://localhost:8080/admin/adminNews/" + this.props.match.params.id;
    var promise = await fetch(url, {
      method: "GET",
      headers: { token: token },
    });

    var prod = await promise.json();
    console.log(prod.data[0].city);
    this.setState({
      id: prod.data[0].id,
      title: prod.data[0].title,
      views: prod.data[0].views,
      image: prod.data[0].image,
      video: prod.data[0].video,
      category: prod.data[0].category,
      city: prod.data[0].city,
      locality: prod.data[0].locality,
      publiceDate: prod.data[0].publish_date,
      article: prod.data[0].article,
      reporterName: "",
    });
    console.log(this.state);
  };
  

  render() {
    return (
      <div className="my-3">
        <div className="container" style={{ width: "80" }}>
          <div className="mx-5">
            <span className="text-secondary mx-1 h6">
              Category : {this.state.category}
            </span>
            <h1>{this.state.title}</h1>
            <div className="row">
              <div className="col-sm-6">
                <span className="text-secondary mx-1 mt-n1 h6">
                  {this.state.locality}
                </span>
                <br />
                <span className="text-secondary mx-1 h6">
                  {this.state.publiceDate}
                </span>
              </div>
              <div className="col-sm-6">
                {" "}
                <span>&nbsp; &nbsp;</span>
                <div
                  className="modal fade"
                  id="exampleModalLong"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            <br />
            <img
              src={`http://localhost:8080/reporters/image/${this.state.image}`}
              alt=""
            />
            <br />
            <br />
            <div style={{ width: "85%" }}>
              {" "}
              <span style={{ fontSize: "100%" }}>{this.state.article}</span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
