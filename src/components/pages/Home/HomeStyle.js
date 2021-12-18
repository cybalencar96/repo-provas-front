import styled from 'styled-components';

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: #292929;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
`;

const RouteButton = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: #121212;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 40px;

    transition: background-color 0.3s;

    &:hover {
        cursor: pointer;
        background-color: lightgray;
        color: black;
    }
`;

export {
    HomeContainer,
    RouteButton,
}