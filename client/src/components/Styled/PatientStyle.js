import styled from 'styled-components'

const PatientStyle = styled.div`
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

const PatientInfoStyle = styled.ul`
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
    width: 30vw;
    font-size: 0.8em;
}
@media only screen and (min-width: 650px){
    font-size: 1em;
}
`
const PatientEditStyle = styled.div`
form{
    max-width: 300px;
    margin: 0 auto;
    background: rgba(255,255,255, 0.7);
    font-size: 0.7em;
    padding: 10px;
}
div{
    display: flex;
    align-items: center;
}
@media only screen and (min-width: 520px){
    form{
        font-size: 0.8em;
    }
}
@media only screen and (min-width: 650px){
    form{
        font-size: 1em;
    }
}
`
const VisitListStyle = styled.ul`
list-style: none;
margin: 0 0 20px;
padding: 0;
a{
    text-decoration: none;
    color: seagreen;
}
`

export {
    PatientStyle,
    PatientInfoStyle,
    VisitListStyle,
    PatientEditStyle
}