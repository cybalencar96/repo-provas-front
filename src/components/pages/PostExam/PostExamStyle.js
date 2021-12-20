import styled, { css } from 'styled-components';

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
        width: 80%;
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

const dragActive = css`
    border-color: #78e5d5;
    color: green;
`

const dragReject = css`
    border-color: #e57878;
    color: red;
`

const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    color: white;
    border: 3px dashed #DDD;
    border-radius: 4px;
    cursor: pointer;

    transition: height 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};

    
    width: 80%;
    height: 100px;

    display:flex;
    justify-content: center;
    align-items: center;
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;

    .file-info {
        display: flex;
        align-items: center;
        

        strong {
            display: block;
            color: white;
            font-weight: bold;
        }

        span {
            font-size: 12px;
            color: #999;
            margin-top: 5px;

            display: flex;
            justify-content: space-between;

            div {
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 5px;
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
`

const Preview = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;
`


export {
    PageContainer,
    FormContainer,
    DropContainer,
    FileContainer,
    Preview,
}