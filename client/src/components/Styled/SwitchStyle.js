import styled from 'styled-components';
import img from '../../Images/coffee.jpg';
import bigImg from '../../Images/largeBackground.jpg'

const StyleWrapper = styled.div`
    height: 100vh;
    background-image: url(${img});
    background-size: cover;
    
    h2{
        margin: 0;
        padding: 10px;
    }
    @media (min-width: 500px) {
        background-image: url(${bigImg})
    }
`

export default StyleWrapper