import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      Login
      <Link to="/signup">회원가입</Link>
    </div>
  );
}

export default Login;
