import styled from 'styled-components';

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: blue;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
`;

const RouteButton = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: green;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 30px;

    transition: background-color 0.5s;

    &:hover {
        cursor: pointer;
        background-color: lightblue;
    }
`;

export {
    HomeContainer,
    RouteButton,
}