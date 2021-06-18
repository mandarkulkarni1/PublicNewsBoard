import React from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  setLogin: () => {}
});

export default LoginContext;
