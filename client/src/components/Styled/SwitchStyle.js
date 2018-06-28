import styled from 'styled-components';
import img from '../Images/coffee.jpg'

const StyleWrapper = styled.div`
    height: 85vh;
    background-image: url(${img});
    background-size: cover;
    h2{
        margin: 0;
        padding: 10px;
    }
`

export default StyleWrapper