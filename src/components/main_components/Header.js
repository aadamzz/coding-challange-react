import React, { useContext } from 'react'
import styled from 'styled-components';
import { ColorContext } from '../../context/ColorModeContext';

const Header = styled.header`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    background-color: ${({ theme: { elementsColor } }) => elementsColor};
    box-shadow: ${({ theme: { componentsShadow } }) => componentsShadow};
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
        color: ${({ theme: { textColor } }) => textColor};
    }
`;

const Header__switch_container = styled(Header__title_container)`
    justify-content: flex-end;

    button {
        margin-right: 50px;
        border: none;
        background-color: ${({ theme: { elementsColor } }) => elementsColor};
        color: ${({ theme: { textColor } }) => textColor};
        font-weight: 600;
        font-size: 1.0625rem;
        cursor: pointer;
    }
`;

function MainHeader() {
    const { colorMode, setColorMode } = useContext(ColorContext)

    const toggleTheme = () => {
        colorMode === "dark" ? (setColorMode("light")) : (setColorMode("dark"))
    };

    return (
        <Header>
            <Header__title_container>
                <h1>Where in the world?</h1>
            </Header__title_container>
            <Header__switch_container>
                {
                    colorMode === "dark" ? (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="hsl(0, 0%, 100%)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
                    </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
                    </svg>)
                }
                <button onClick={toggleTheme}>{colorMode === "dark" ? ("Light Mode") : ("Dark Mode")}</button>
            </Header__switch_container>
        </Header>
    );
};

export default MainHeader;
