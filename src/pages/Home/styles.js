import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    margin: 20px;
    padding: 2px;
    display: flex;
    flex-direction: column;

    .link {
        cursor: pointer;
        color: #A23;
        align-self: start;
        align-text: start;
    }

    img {
        height: 200px;
        width: 200px;
        margin-bottom: -20px;
    }
    h3{
        font-size: 16px;
    }
    
    .row{
        width: 600px;
        margin: 0 auto;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        ${'' /* background: #A23; */}
    }

    label {
        text-align: left;
        width: 400px;
        align-self: start;
        align-text: start;
        margin: 0 auto;  ${'' /* center */}
        ${'' /* background: #A23; */}
        font-weight: bold;
        font-size: 16px;
        font-family: "Courier New", Courier, monospace;
        margin-top: 10px;
    }
    input {
        width: 400px;
        height: 40px;
        margin: 0 auto;  ${'' /* center */}
        ${'' /* background: #A23; */}
        border: 2px solid #a7a7a9;
        border-radius: 8px;
        padding-left: 10px;
        cursor: pointer;
        font-size: 14px;
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