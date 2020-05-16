import React from 'react'
import styled from 'styled-components';
import { Roller } from 'react-awesome-spinners';

const Wrapper = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function Loader() {
    return (
        <Wrapper>
            <Roller />
        </Wrapper>
    )
}

export default Loader
