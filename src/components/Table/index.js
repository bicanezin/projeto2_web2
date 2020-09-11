import React from "react";
import axios from "axios";

function Table({ tableTitle, columnTitle, urlList }) {
  const [urlDetails, setUrlDetails] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleUrlDetails = (hashId) => {
    setOpen((prev) => !prev);
    const config = {
      method: "GET",
      url: `https://rel.ink/api/links/${hashId}`,
    };

    axios(config)
      .then((res) => {
        const date = new Date(res.data.created_at).toLocaleDateString();
        setUrlDetails([{ link: res.data.url, data: date }]);
        setOpen(true);
      })
      .catch((error) => {
        // setStatus({
        //   msg: "URL inválida!",
        //   key: Math.random(),
        //   type: "error",
        // });
        // alert("URL inválida!");
        console.log(error);
      });
  };

  return (
    <div className="table">
      <h3 className="subtitle">{tableTitle}</h3>
      <div style={{}}>
        <table className="table-primary">
          <tbody>
            <tr>
              {columnTitle.map((item, index) => (
                <th key={index} style={{ width: "60%" }}>
                  {item}
                </th>
              ))}
            </tr>
            {urlList !== undefined
              ? urlList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.link}</td>
                    <td>
                      <img
                        alt="icone copiar link"
                        // onClick="btnCopyOnClick('${hashid}')"
                        src={require("../../images/copy-link.png")}
                        id="btn_copy"
                        width="23"
                        height="23"
                      />
                    </td>
                    <td>
                      <div>
                        <img
                          alt="icone ver mais"
                          onClick={() => handleUrlDetails(item.hashId)}
                          src={require("../../images/see_more.png")}
                          id="btn_see_more"
                          width="23"
                          height="23"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {urlDetails !== undefined && open
          ? urlDetails.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  alignSelf: "center",
                  width: "80%",
                }}
              >
                <p>{item.link}</p>
                <p>{item.data}</p>
                <p onClick={() => setOpen(false)}>fechar</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Table;
