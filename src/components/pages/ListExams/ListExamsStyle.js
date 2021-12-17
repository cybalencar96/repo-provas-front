import styled from 'styled-components';

const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #292929;

    .type-list-options {
        height: 200px;
        padding: 20px;
        border-bottom: 1px solid grey;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #232323;  
    }

    .type-list-options div {
        width: 40%;
        height: 100px;
        background-color: #121212;  

        color: whitesmoke;
        font-size: 30px;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: background-color 0.3s;
    }

    .type-list-options div:hover {
        cursor: pointer;
        background-color: lightgray;
        color: black
    }

    .content {
        display: flex;
        height: calc(100vh - 200px);
    }
`;

const TypeList = styled.ul`
    width: 30%;
    overflow-y: scroll;
    border-right: 1px solid grey;
`;

const ExamsList = styled.ul`
    width: 70%;
    overflow-y: scroll;
    border-right: 1px solid grey;
`;

const LiElement = styled.li`
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 25px;
    color: white;
    border-bottom: 1px solid grey;

    background-color: #121212;

    :hover{
        cursor: pointer;
        background-color: lightgray;
        color: black;
    }
`

export {
    PageContainer,
    ExamsList,
    TypeList,
    LiElement,
}