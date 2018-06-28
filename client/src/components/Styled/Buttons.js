import styled from 'styled-components';

const Button = styled.button`
    background-color: ${props => props.theme.bg};
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
    bg: 'white',
    fc: 'green'

}
const logIn = {
    bg: 'white',
    fc: 'maroon'
}
const create = {
    bg: 'white',
    fc: 'teal'

}

export {
    Button,
    add,
    logIn,
    create,
}