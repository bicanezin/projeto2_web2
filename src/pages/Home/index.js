import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AlertMessage from "../../components/Alert";
import Table from "../../components/Table";

function Home() {
  const [url, setUrl] = React.useState("");
  const [urlList, setUrlList] = React.useState([]);
  const [status, setStatus] = React.useState("");

  const shortenUrl = () => {
    const config = {
      method: "POST",
      url: "https://rel.ink/api/links/",
      data: {
        url,
      },
    };

    axios(config)
      .then((res) => {
        const newUrl = `https://rel.ink/${res.data.hashid}`;
        setUrlList([...urlList, { link: newUrl, hashId: res.data.hashid }]);
        setStatus({
          msg: `Link encurtado`,
          key: Math.random(),
          type: "success",
        });
      })
      .catch((error) => {
        setStatus({ msg: "URL inválida!", key: Math.random(), type: "error" });
        // alert("URL inválida!");
        console.log(error);
      })
      .finally(setUrl(""));
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      <Link to="/">Login</Link>
      <div className="App">
        <div className="container">
          <h1 className="title">UTFShortener</h1>
          <h3 className="subtitle">
            O melhor encurtador de links da internet xD
          </h3>

          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="txt-primary"
            type="url"
            id="url"
            placeholder="Entre com a URL..."
          />

          <button className="btn-primary" onClick={shortenUrl}>
            Encurtar
          </button>

          <Table
            tableTitle={"Links encurtados:"}
            columnTitle={["Link Curto", "Copiar Link", "Ver Detalhes"]}
            urlList={urlList}
          />
          {/* <Table
            tableTitle={"Detalhes de um link encurtado:"}
            columnTitle={["Link Original", "Data"]}
            // urlDetails={urlDetails}
          /> */}
        </div>

        {status ? (
          <AlertMessage
            key={status.key}
            message={status.msg}
            type={status.type}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
