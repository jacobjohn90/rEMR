import styled from 'styled-components'

const NewPatientStyle = styled.form`
    max-width: 350px;
    margin: 0 auto 10px;
    background: rgba(255,255,255, 0.7);
    font-size: 0.7em;
    padding: 10px;
    border-radius: 5px;
    div{
        display: flex;
        align-items: center;
    }
    @media (min-width: 500px) {
        div{
            display: flex;
        }
        button{
            display: block;
            text-align: center;
            align-items: center;
            margin: 0 auto;
        }    
    }
`


export default NewPatientStyle