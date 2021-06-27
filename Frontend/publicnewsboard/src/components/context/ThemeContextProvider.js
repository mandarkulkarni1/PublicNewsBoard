import { useState } from "react";
import ThemeContext from "./ThemeContext";

function ThemeContextProvider(props){
    const [theme,toggleTheme] = useState(true);

    const value = {
        theme,
        toggleTheme,
    };

    return(
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;