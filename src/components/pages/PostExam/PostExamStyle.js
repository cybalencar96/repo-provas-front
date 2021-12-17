import styled from 'styled-components';

const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #292929;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 0;

    background-color: green;
    width: 500px;
    height: 500px;

    & label {
        font-size: 30px;
        color: white;
    }

    & input {
        width: 80%;
        height: 50px;
        font-size: 20px;
        padding-left: 20px;
        border-radius: 10px;
    }

    & button {
        width: 70%;
        height: 50px;
        font-size: 23px;
    }
`;

export {
    PageContainer,
    FormContainer,
}