import React from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import useForm from "./useForm";
import { getToken, setUserSession } from '../../utils/common';
import AlertMessage from "../../components/Alert";
import { Container, Form, Buttons } from './styles';

const SignUp = () => {
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
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
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Insira senhas iguais';
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
      url: "https://reqres.in/api/register",
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
        <h3>Cadastro</h3>

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

          <label>Confirmar senha</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
            required
          />

          {errors.confirmPassword && (
            <p className="error">
              {errors.confirmPassword}
            </p>
          )}

          {loading ? <CircularProgress size={"30px"} color={"inherit"} className="loading"/> :
            <Buttons>
              <button
                disabled={loading}
              >
                Salvar
                </button>
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

export default SignUp;
