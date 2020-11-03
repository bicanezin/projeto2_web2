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
  const [loadingTable, setLoadingTable] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

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
    setLoading(true);
    setLoadingTable(true);

    const config = {
      method: "GET",
      url: "https://web2-trab3-api.herokuapp.com/api/v1/links",
      headers: { Authorization: "Bearer " + token },
    };

    axios(config)
      .then((res) => {
        setLoading(false);
        setLoadingTable(false);
        setUrlList(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingTable(false);
        setStatus({ msg: "URL inválida!", key: Math.random(), type: "error" });
        console.log(error);
      })
      .finally(setUrl(""));
  };

  const search = async (val) => {
    setLoadingTable(true);

    const config = {
      method: "GET",
      url: `https://web2-trab3-api.herokuapp.com/api/v1/links?search=${val}`,
      headers: { Authorization: "Bearer " + token },
    };

    axios(config)
      .then((res) => {
        setLoadingTable(false);
        setUrlList(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setStatus({ msg: "URL inválida!", key: Math.random(), type: "error" });
        console.log(error);
      })
      .finally(setUrl(""));
  };

  const onChangeHandler = async (e) => {
    search(e.target.value);
    setSearchInput(e.target.value);
  };

  if (redirect) {
    return <Redirect push to="/" />;
  }
  return (
    <Container>
      <p className="user_email">{userEmail}</p>
      <p onClick={() => logout()} className="logout">
        sair
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

        <div className={"searchContainer"}>
          <img
            className="searchIcon"
            alt="icone lupa"
            src={require("../../assets/loupe.png")}
          />

          <input
            className="search"
            value={searchInput}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Busque pelo link encurtado ou original"
          ></input>
        </div>

        {loadingTable ? (
          <div>
            <CircularProgress
              style={{ alignSelf: "center", marginTop: "100px" }}
              size={"30px"}
              color={"inherit"}
            />
          </div>
        ) : (
          <div>
            {console.log()}
            {urlList.length === 0 ? (
              <p style={{ marginTop: "100px", color: "red" }}>
                Nenhum link encontrado!
              </p>
            ) : (
              <Table
                tableTitle={"Links encurtados:"}
                columnTitle={["Link Curto", "Copiar Link", "Ver Detalhes"]}
                urlList={urlList}
              />
            )}
          </div>
        )}
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
