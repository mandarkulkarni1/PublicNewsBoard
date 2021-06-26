import {createContext} from "react";

const ReaderLoginContext = createContext({
    isLoggedIn : false,
    setLogin: () => {},
});

export default ReaderLoginContext;