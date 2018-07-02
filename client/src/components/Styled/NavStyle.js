import styled from 'styled-components'

const NavStyleWrapper = styled.div`
    display: block;
    background-color: gray;
    text-align: center;
    height: 15vh;
    h1{
        margin: 0;
        padding-top: 10px;
    }
    h5{
        margin: 0;
        /* margin-bottom: 5px; */
    }
    div{
        display: inline-flex;
        align-content: center;
        margin-top: 3px;
    }
    img{
        width: 20px;
        height: 20px;
        margin-right: 10px;
        :hover{
            cursor: pointer 
        };
    }
    a{
        text-decoration: none;
        color: teal;
    }
`


export default NavStyleWrapper