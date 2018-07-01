import styled from 'styled-components';

const LogInStyle = styled.div`
    text-align: center;
    background-color: rgba(255,255,255, 0.7);
    padding: 1rem;
    min-height: 30%;
    max-width: 60vw;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    overflow: auto;
    max-height: 70vh;
    button{
        margin-left: 0;
    }
    form{
        display: flex;
        flex-direction: column;
        input{
            flex: 1;
            margin: 0 1em 1em 1em;
            border: 1px solid black;
            background-color: lightgoldenrodyellow;
            border-radius: 3px;
            padding: 0.5em 1em;
            text-align: left;
            min-width: 50px;
            }
    }
    @media only screen and (min-width: 500px) {
        form{
            display: block;
            input{
                display: block;
                margin: 10px auto;
            }
        }
    }
`


export default LogInStyle