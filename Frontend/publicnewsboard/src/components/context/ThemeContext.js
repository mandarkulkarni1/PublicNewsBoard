import {createContext} from "react";

const ThemeContext = createContext({
    theme : true,
    toggleTheme: () => {},
});

export default ThemeContext;