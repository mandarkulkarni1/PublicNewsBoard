import React from "react";
const ReaderAddUser = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-5 col-lg-5  mx-auto">
          <div style={{ textAlign: "center" }}>
            <img
              src={require("../Asset/Reader.png").default}
              alt=""
              style={{ width: "85px" }}
            />
            <h5 className="text-primary">
              {" "}
              <b>Register User</b>{" "}
            </h5>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="Text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <small id="passwordHelpInline" class="text-muted">
              Must be 8-20 characters long.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%" }}
            className="btn btn-primary"
          >
            Signup <span>&nbsp;</span>
            <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReaderAddUser;
