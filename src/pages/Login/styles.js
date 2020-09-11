import styled from 'styled-components';

export const Container = styled.div`
    ${'' /* background: #BB669A; */}
    text-align: center;
    margin: 20px;
    padding: 2px;
    display: flex;
    flex-direction: column;

    img {
        height: 200px;
        width: 200px;
    }

    h3{
        margin-left: -300px;
        font-size: 28px;
    }
`;

export const Form = styled.form`
    ${'' /* background: #F234F8; */}
    flex-direction: column;
    display: flex;

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

    .error {
        text-align: left;
        width: 400px;
        align-self: start;
        align-text: start;
        margin: 0 auto;  ${'' /* center */}
        ${'' /* background: #A23e56; */}
        color: red;
        font-size: 12px;
        font-family: "Courier New", Courier, monospace;
    }
`;

export const Buttons = styled.div`
    ${'' /* background: #F234F8; */}
    max-width: 400px;
    flex-direction: column;
    display: flex;
    ${'' /* justify-content: space-around; */}
    margin: 0 auto;  ${'' /* center */}
    margin-top: 15px;

    button {
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
    }
`;