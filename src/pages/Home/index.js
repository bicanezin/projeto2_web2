import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getToken, removeUserSession, getUser } from "../../utils/common";
import { Container, Button } from "./styles";
import AlertMessage from "../../components/Alert";
import Table from "../../components/Table";

function Home() {
  const [url, setUrl] = React.useState("");
  const [urlList, setUrlList] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    getToken()
      .then(function (result) {
        if (result !== null) {
          setRedirect(false);
          setToken(result);
          getLinks(result);
        } else setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    getUser().then(function (result) {
      setUserEmail(result);
    });
  }, []);

  const logout = async () => {
    removeUserSession();
    setRedirect(true);
  };

  const shortenUrl = () => {
    setLoading(true);

    const config = {
      method: "POST",
      url: "https://web2-trab3-api.herokuapp.com/api/v1/links",
      data: {
        link_original: url,
      },
      headers: { Authorization: "Bearer " + token },
    };

    axios(config)
      .then((res) => {
        setLoading(false);
        // const newUrl = `https://rel.ink/${res.data.hashid}`;
        // setUrlList([...urlList, { link: newUrl, hashId: res.data.hashid }]);
        setStatus({
          msg: `Link encurtado`,
          key: Math.random(),
          type: "success",
        });
        getLinks(token);
      })
      .catch((error) => {
        setLoading(false);
        setStatus({ msg: "URL inválida!", key: Math.random(), type: "error" });
        console.log(error);
      })
      .finally(setUrl(""));
  };

  const getLinks = (token) => {
    const config = {
      method: "GET",
      url: "https://web2-trab3-api.herokuapp.com/api/v1/links",
      headers: { Authorization: "Bearer " + token },
    };

    axios(config)
      .then((res) => {
        setLoading(false);
        setUrlList(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setStatus({ msg: "URL inválida!", key: Math.random(), type: "error" });
        console.log(error);
      })
      .finally(setUrl(""));
  };

  if (redirect) {
    return <Redirect push to="/" />;
  }
  return (
    <Container>
      <p className="user_email">{userEmail}</p>
      <p onClick={() => logout()} className="logout">
        Sair
      </p>
      <div>
        <img
          alt="logo UTFShortener"
          src={require("../../assets/logo512.png")}
        />
        <h3>O melhor encurtador de links da internet xD</h3>

        <div className="row">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            type="url"
            id="url"
            placeholder="Entre com a URL..."
          />

          {loading ? (
            <CircularProgress size={"30px"} color={"inherit"} />
          ) : (
            <Button onClick={shortenUrl}>Encurtar</Button>
          )}
        </div>

        <Table
          tableTitle={"Links encurtados:"}
          columnTitle={["Link Curto", "Copiar Link", "Ver Detalhes"]}
          urlList={urlList}
        />
      </div>

      {status ? (
        <AlertMessage
          key={status.key}
          message={status.msg}
          type={status.type}
        />
      ) : null}
    </Container>
  );
}

export default Home;
