import styled from 'styled-components';

const Button = styled.button`
    background-color: white;
    color: ${props=> props.theme.color};
    border: 2px solid ${props => props.theme.color};
    border-radius: 5px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    :hover{
        background-color: white;
        color: black;
        border: 2px solid black;
    }
    :focus{
        outline: none;
    }
    :active{
        background-color: black;
        color: white;
    }
`
const green = {
    color: 'green'
}
const maroon = {
    color: 'maroon'
}
const teal = {
    color: 'teal'
}

export {
    Button,
    green,
    maroon,
    teal,
}