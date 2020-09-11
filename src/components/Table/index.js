import React from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Container, Details } from './styles';
import AlertMessage from "../Alert";

function Table({ tableTitle, columnTitle, urlList }) {
  const [status, setStatus] = React.useState("");
  const [urlDetails, setUrlDetails] = React.useState([{ link: "", data: "" }]);
  const [selectedDetail, setSelectedDetail] = React.useState(false)

  const handleUrlDetails = (hashId) => {
    setSelectedDetail(true);
    const config = {
      method: "GET",
      url: `https://rel.ink/api/links/${hashId}`,
    };

    axios(config)
      .then((res) => {
        setSelectedDetail(false);
        const date = new Date(res.data.created_at).toLocaleDateString();
        setUrlDetails([{ link: res.data.url, data: date }]);
      })
      .catch((error) => {
        setSelectedDetail(false);
        console.log(error);
      });
  };

  let link = "";
  const copyToClipboard = () => {
    link.select();
    document.execCommand("copy");
    setStatus({ msg: "Link copiado!", key: Math.random(), type: "success", duration: 4000 });
  };

  return (
    <Container>
      <div>
        <p>{tableTitle}</p>
        <table>
          <tbody>
            <tr>
              {columnTitle.map((item, index) => (
                <th key={index}>
                  {item}
                </th>
              ))}
            </tr>
            {urlList !== undefined
              ? urlList.map((item, index) => (
                <tr key={index}>
                  <td >
                    <input readOnly value={item.link} ref={(ref) => link = ref} />
                  </td>
                  <td>
                    <img
                      alt="icone copiar link"
                      onClick={() => copyToClipboard()}
                      src={require("../../assets/copy-link.png")}
                    />
                  </td>
                  <td>
                    <div>
                      <img
                        alt="icone ver mais"
                        onClick={() => handleUrlDetails(item.hashId)}
                        src={require("../../assets/see_more.png")}
                      />
                    </div>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
      <div>
        <p>Detalhes do link:</p>
        {selectedDetail ? (
          <div className="loading">
            <CircularProgress size={"30px"} color={"inherit"} />
          </div>
        ) : urlDetails.map((item, index) => (
          <Details key={index}>
            {item.link !== "" ?
              <> <p className="label">Link original:</p>
                <p>{item.link}</p>
                <p className="label">Data do encurtamento:</p>
                <p>{item.data}</p>
              </> : <p className="label">Escolha um link</p>}

          </Details>
        ))}

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

export default Table;
