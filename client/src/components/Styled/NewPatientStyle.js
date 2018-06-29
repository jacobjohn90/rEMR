import styled from 'styled-components'

const NewPatientStyle = styled.form`
background-color: rgba(255,255,255,0.7);
padding: 10px;
border-radius: 5px;
margin: 10px auto;
max-width: 450px;

div{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    input{
        /* flex:1 */
        width: 200px;
    };
}


}
@media (min-width: 500px) {
div{
    display: flex;
    input{
        
    }
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