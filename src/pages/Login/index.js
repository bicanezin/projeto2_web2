import React from "react";
import { Link, Redirect } from "react-router-dom";

function Login() {
  const [redirect, setRedirect] = React.useState(false);
  const nextPath = (path) => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect push to="/home" />;
  }
  return (
    <div style={{ flexDirection: "row" }}>
      <Link to="/Home">Já possuo uma conta</Link>
      <button type="button" onClick={nextPath}>
        HOME
      </button>
    </div>
  );
}

export default Login;
