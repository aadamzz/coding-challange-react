import React, { createContext, useState } from 'react'

export const ColorContext = createContext()

export const ColorModeContext = ({ children }) => {
    const [colorMode, setColorMode] = useState("dark");

    return (
        <ColorContext.Provider value={{ colorMode, setColorMode }}>
            {children}
        </ColorContext.Provider>
    )
}

