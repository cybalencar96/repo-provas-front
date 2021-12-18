import styled from 'styled-components';

const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #292929;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;

    & > p {
        font-size: 70px;
        color: whitesmoke;
        cursor: pointer;

        position: fixed;
        top: 50px;
        left: 50px;
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
    padding: 20px 0;

    background-color: #121212;
    width: 60vw;
    max-width: 700px;
    height: 80vh;

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
        background-color: #303030;
        color: white;
    }

    & button {
        width: 70%;
        height: 50px;
        font-size: 23px;
        cursor: pointer;

        transition: background-color 0.3s;
        
        &:hover {
            background-color:#174EA6;
            color: white;
        }
    }
`;

export {
    PageContainer,
    FormContainer,
}