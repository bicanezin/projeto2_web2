import React from 'react';
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import useForm from "./useForm";
import { getToken, setUserSession } from '../../utils/common';
import AlertMessage from "../../components/Alert";
import { Container, Form, Buttons } from './styles';

const Login = () => {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const initialValues = {
    email: '',
    password: '',
  }

  function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Insira um endereço de email';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Insira um email válido';
    }
    if (!values.password) {
      errors.password = 'Insira uma senha';
    } else if (values.password.length < 3) {
      errors.password = 'Insira uma senha com 3 ou mais caracteres';
    }
    return errors;
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, handleSignIn, validate);

  React.useEffect(() => {
    getToken().then(function
      (result) {
      if (result === null)
        setRedirect(false);
      else
        setRedirect(true);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  
  function handleSignIn() {
    setLoading(true);
    let config = {
      method: "POST",
      url: "https://reqres.in/api/login",
      data: {
        "email": values.email, "password": values.password
      }
    }

   axios(config)
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.token);
      }).then(() => setRedirect(true))
      .catch(error => {
        setLoading(false);
        setStatus({ msg: "Dados inválidos!", key: Math.random(), type: "error", duration: 10000 });
        console.log(error);
      })
  };

  if (redirect) {
    return <Redirect push to="/home" />;
  }
  return (
    <Container >
      <div>
        <img
          alt="logo UTFShortener"
          src={require("../../assets/logo512.png")} />
        <h3>Login</h3>

        <Form onSubmit={handleSubmit} noValidate>
          <label>Email</label>
          <input
            autoComplete="off"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            required
          />
          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}

          <label>Senha</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
          />

          {errors.password && (
            <p className="error">
              {errors.password}
            </p>
          )}

          {loading ? <CircularProgress size={"30px"} color={"inherit"} className="loading" /> :
            <Buttons>
              <button
                disabled={loading}
              >
                Login
                </button>
              <p>OU</p>
              <Link to="/signUp">Cadastre-se</Link>
            </Buttons>
          }
        </Form>
      </div>

      {status ? (
        <AlertMessage
          key={status.key}
          message={status.msg}
          type={status.type}
          duration={status.duration}
        />
      ) : null}
    </Container>
  );
}

export default Login;
