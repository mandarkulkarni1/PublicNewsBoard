import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginService } from "../Service/LoginService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddReporter from "./AddReporter";
import RegisterReader from "../Reader/RegisterReader";
import LoginContext from "../Login/LoginContext";
const Login = () => {
  //   const {setLogin}=useContext(LoginContext);
  const { setLogin } = useContext(LoginContext);
  const history = useHistory();
  const [FormData, seFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { email, password, role } = FormData;

  function handleInputChange({ target }) {
    const { name, value } = target;
    seFormData({ ...FormData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (FormData.email.length === 0) {
      toast.warning("please enter email name");
    } else if (password.length === 0) {
      toast.warning("please enter password");
    } else if (role === "") {
      toast.warning("please choose role");
    } else {
      // setLogin(true);
      LoginService(FormData).then((res) => {
        if (res["status"] === "success") {
              setLogin(true)
              sessionStorage.setItem("isLoggedIn",true)
          if (FormData.role === "Admin") {
            sessionStorage.setItem("admin", JSON.stringify(res.data));
            sessionStorage.setItem("token",res.data.token)
            sessionStorage.setItem("role","admin");
            history.push("/admin");
          } else if (FormData.role === "Reporter") {
            sessionStorage.setItem("reporter", JSON.stringify(res.data));
            sessionStorage.setItem("token",res.data.token)
            history.push("/reporter");
          } else if (FormData.role === "Reader") {
            sessionStorage.setItem("reader", JSON.stringify(res.data));

            history.push("/");
          } else {
            history.push("/");
          }
        } else {
          toast.error(res["error"]);
          history.push("/login");
        }
      });
    }

    //   history.push('/reporter')
  }

  return (
    <div className="container">
      <div className="row m-2">
        <form
          className="col-md-5 col-lg-5  mx-auto border border-info p-4 rounded"
          onSubmit={handleFormSubmit}
        >
          <div style={{ textAlign: "center" }}>
            <img
              style={{ borderRadius: "50%", height: "130px" }}
              src={require("../../Asset/signin.png").default}
              alt=""
            />
          </div>
          <div className="h4" style={{ textAlign: "center" }}>
            <b className="text-info">Login</b>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Select Role</label>
            <select
              className="form-control"
              name="role"
              value={role}
              onChange={handleInputChange}
            >
              <option value={""}>Select</option>
              <option value={"Reader"}>Reader</option>
              <option value={"Reporter"}>Reporter</option>
              <option value={"Admin"}>Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{ width: "80%" }}
              className="btn btn-primary mt-2"
            >
              Sign-in <span>&nbsp;</span>
              <i className="fa fa-sign-in text-white" aria-hidden="true"></i>
            </button>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <button
                type="button"
                style={{ width: "100%" }}
                className="btn btn-secondary"
                onClick={() => {
                  history.push("/registerReader");
                }}
              >
                Register Reader<span>&nbsp;</span>
                <i className="fa fa-user-plus text-white"></i>
              </button>
            </div>

            <div className="col-md-6">
              <button
                type="button"
                style={{ width: "100%" }}
                className="btn btn-secondary"
                onClick={() => {
                  history.push("/addReporter");
                }}
              >
                Register Reporter <span>&nbsp;</span>
                <i className="fa fa-user-plus text-white"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
