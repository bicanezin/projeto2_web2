import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  margin: 10px;
  padding: 2px;
  display: flex;
  flex-direction: column;

  .logout {
    font-size: 13px;
    cursor: pointer;
    color: red;
    align-self: start;
    align-text: start;
    margin-top: -15px;
  }

  .user_email {
    color: #000000;
    align-self: start;
    align-text: start;
  }

  img {
    height: 200px;
    width: 200px;
    margin-bottom: -20px;
  }
  h3 {
    font-size: 16px;
  }

  .row {
    width: 600px;
    margin: 0 auto;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    ${"" /* background: #A23; */}
  }

  label {
    text-align: left;
    width: 400px;
    align-self: start;
    align-text: start;
    margin: 0 auto;
    ${"" /* center */}
    ${"" /* background: #A23; */}
        font-weight: bold;
    font-size: 16px;
    font-family: "Courier New", Courier, monospace;
    margin-top: 10px;
  }
  input {
    width: 400px;
    height: 40px;
    border: 1px solid #091636;
    border-radius: 4px;
    padding-left: 10px;
    cursor: unset;
    font-size: 14px;
    font-family: "Courier New", Courier, monospace;
  }
  .searchContainer {
    width: 950px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 40px;
    text-align: left;
    align-items: center;
    justify-content: space-between;
  }
  .searchIcon {
    position: absolute;
    margin: 0 auto;
    height: 18px;
    width: 18px;
    padding-left: 10px;
  }
  .search {
    width: 300px;
    background: #ffffff;
    border: 0px solid #000000;
    border-radius: 4px;
    padding-left: 45px;
    font-size: 12.5px;
    font-family: "Courier New", Courier, monospace;
  }
`;

export const Button = styled.button`
  margin: 0 auto;
  text-align: center;
  width: 150px;
  height: 50px;
  background: #fada5e;
  color: #091636;
  font-weight: bold;
  border: 2px solid #091636;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Courier New", Courier, monospace;
`;
