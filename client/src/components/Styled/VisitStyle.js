import styled from 'styled-components'

const VisitStyle = styled.div`
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
    max-height: 72.5vh;
    font-size: 0.7rem;
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
    @media only screen and (min-width: 520px){
        font-size: 0.8rem;
    }
    @media only screen and (min-width: 650px){
        font-size: 1rem;
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
        width: 40vw;
        font-size: 0.8rem;
    }
    @media only screen and (min-width: 650px){
        font-size: 1rem;
    }
`
const VisitEditStyle = styled.div`
    form{
        max-width: 350px;
        margin: 0 auto 10px;
        background: rgba(255,255,255, 0.7);
        font-size: 0.7em;
        padding: 10px;
        border-radius: 5px;
    }
    div{
        display: flex;
        align-items: center;
    }
    @media only screen and (min-width: 520px){
        form{
            font-size: 0.8rem;
        }
    }
    @media only screen and (min-width: 650px){
        form{
            font-size: 1rem;
        }
    }
`
export {
    VisitStyle,
    VisitInfoStyle,
    VisitEditStyle
}