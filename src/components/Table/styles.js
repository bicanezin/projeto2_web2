import styled from 'styled-components';

export const Container = styled.div`
    width: 900px;
    ${'' /* background: #BB669A; */}
    display: flex;
    flex-direction: row;
    margin: 0 auto; 
    margin-top: 20px;
    text-align: left;
    justify-content: space-between;

    p {
        font-size: 17px;
        line-height:1;
        ${'' /* background: #668a99; */}
        font-weight: bold;
    }

    table {
        table-layout:fixed;
        width:90%;
    }

    th:nth-of-type(2),    
    th:nth-of-type(3) { 
        width: 5%; 
    }

    th {
        background: #091636;
        color: #ffffff;
        font-weight: bold;
    }

    th, td {
        font-size: 14px;
        text-align: center;
        border: 1px solid #dddddd;
        padding: 8px;
        width: 50px;
    }

    input {
        font-size: 15px;
        border: 0px;
        background: 'transparent';
    }

    img {
        margin: 0 auto; 
        height: 25px;
        width: 25px;
        cursor: pointer;
    }
  

    .loading {
    padding: 10px;
    width: 310px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    }
`;

export const Details = styled.div`
    padding: 10px;
    width: 300px;
    word-wrap: break-word;
    border: 2px solid #091636;
    background: #a7a7a9;
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    .label{
        line-height: 0;
        font-size: 14px;
        font-weight: bold;
    }

    p {
        line-height: 1;
        font-size: 13px;
        ${'' /* background: #668a99; */}
    } 
`;