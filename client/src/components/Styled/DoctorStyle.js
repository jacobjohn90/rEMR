import styled from 'styled-components';

const DoctorStyle = styled.div`
text-align: center;
background-color: rgba(255,255,255, 0.7);
padding: 1rem;
min-height: 30%;
max-width: 90vw;
margin: 0 auto;
margin-top: 1rem;
border-radius: 5px;

ul{
    list-style: none;
    margin: 0 0 20px;
    padding: 0;
    a{
        text-decoration: none;
        color: seagreen;
    }
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
        padding: 0.5rem 1rem;
        text-align: left;
        }
}
@media only screen and (min-width: 500px) {
    form{
        display: block;
    }
}
`

export default DoctorStyle