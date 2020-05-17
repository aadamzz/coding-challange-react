import React from 'react'
import styled from 'styled-components';

const Header = styled.header`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};
`;

const Header__title_container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;  
    height: 100%;
    justify-content: flex-start;
    
    h1 {  
        margin-left: 50px;
        font-weight: 800;
        font-size: 22px;
        color: ${({ theme: { darkMode: { textColor } } }) => textColor};
    }
`;

const Header__switch_container = styled(Header__title_container)`
    justify-content: flex-end;

    button {
        margin-right: 50px;
        border: none;
        background-color: ${({ theme: { darkMode: { elementsColor } } }) => elementsColor};
        color: ${({ theme: { darkMode: { textColor } } }) => textColor};
        font-weight: 600;
        font-size: 1.0625rem;
        cursor: pointer;
    }
`;

function MainHeader() {
    
    return (
        <Header>
            <Header__title_container>
                <h1>Where in the world?</h1>
            </Header__title_container>
            <Header__switch_container>
                <button>Light mode</button>
            </Header__switch_container>
        </Header>
    );
};

export default MainHeader;
