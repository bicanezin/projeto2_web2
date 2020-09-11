import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 body {
  color: #091636;
  font-family: "Courier New", Courier, monospace;
}

.title {
  font-size: 28px;
  font-weight: bolder;
}

.subtitle {
  font-size: 20px;
}

.txt-primary {
  text-align: center;
  width: 50%;
  height: 40px;
  border: 2px solid #a7a7a9;
  border-radius: 8px;
  padding: 0;
  font-size: 17px;
  font-family: "Courier New", Courier, monospace;
}

.btn-primary {
  width: 20%;
  height: 50px;
  background: #fada5e;
  color: #091636;
  font-weight: bold;
  border: 2px solid #091636;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Courier New", Courier, monospace;
}
`;