import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import useForm from "./useForm";
import { getToken, setUserSession } from "../../utils/common";
import { Container, Form, Buttons } from "./styles";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const initialValues = {
    email: "",
    password: "",
    postError: "",
  };

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Insira um endereço de email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Insira um email válido";
    }
    if (!values.password) {
      errors.password = "Insira uma senha";
    } else if (values.password.length < 3) {
      errors.password = "Insira uma senha com 3 ou mais caracteres";
    }
    return errors;
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSignIn,
    validate
  );

  React.useEffect(() => {
    getToken()
      .then(function (result) {
        if (result === null) setRedirect(false);
        else setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleSignIn() {
    setLoading(true);
    let config = {
      method: "POST",
      url: "https://web2-trab3-api.herokuapp.com/api/v1/users/auth",
      data: {
        user_email: values.email,
        user_password: values.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.data.token, values.email);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.data.token}`;
      })
      .then(() => setRedirect(true))
      .catch((error) => {
        errors.postError = error.response.data.data.message;
        setLoading(false);
        console.log(error.response.data.data.message);
      });
  }

  if (redirect) {
    return <Redirect push to="/home" />;
  }
  return (
    <Container>
      <div>
        <img
          alt="logo UTFShortener"
          src={require("../../assets/logo512.png")}
        />
        <h3>Login</h3>

        <Form onSubmit={handleSubmit} noValidate>
          {errors.postError && <p className="error">{errors.postError}</p>}
          <label>Email</label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Senha</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
          />

          {errors.password && <p className="error">{errors.password}</p>}

          {loading ? (
            <CircularProgress
              size={"30px"}
              color={"inherit"}
              className="loading"
            />
          ) : (
            <Buttons>
              <button disabled={loading}>Login</button>
              <p>OU</p>
              <Link to="/signUp">Cadastre-se</Link>
            </Buttons>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Login;
