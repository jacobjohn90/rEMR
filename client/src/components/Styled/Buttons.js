import styled from 'styled-components';

const Button = styled.button`
    background-color: white;
    color: ${props=> props.theme.fc};
    border: 2px solid ${props => props.theme.fc};
    border-radius: 5px;
    padding: 0.5rem;
    margin-left: 1em;
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

`;
const add = {
    fc: 'green'

}
const logIn = {
    fc: 'maroon'
}
const create = {
    fc: 'teal'

}

export {
    Button,
    add,
    logIn,
    create,
}