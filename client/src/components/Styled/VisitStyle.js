import styled from 'styled-components'

const VisitStyle = styled.div`
text-align: center;
background-color: rgba(255,255,255, 0.7);
padding: 1rem;
min-height: 30%;
max-width: 75vw;
margin: 0 auto;
margin-top: 1rem;
margin-bottom: 1rem;
border-radius: 5px;
overflow: auto;
max-height: 70vh;
button{
    margin-left: 0;
}
button:nth-child(6){
    margin-left: 10px;
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
    }
}
`
const VisitInfoStyle = styled.ul`
    width: 50vw;
    font-size: 0.7em;
    background-color: rgba(255,255,255,0.7);
    border-radius: 5px;
    list-style: none;
    margin: 0 auto 10px;
    padding: 10px;
    padding-left: 10px;
    text-align: left;

@media only screen and (min-width: 520px){
    width: 50vw;
    font-size: 0.8em;
}
@media only screen and (min-width: 650px){
    font-size: 1em;
}
`
export {
    VisitStyle,
    VisitInfoStyle
}