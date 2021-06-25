import { useState } from "react";
import ReaderLoginContext from "./ReaderLoginContext";

function ReaderLoginContextProvider(props){
    const [isLoggedin,setLogin] = useState(false);

    const value = {
        isLoggedin,
        setLogin,
    };

    return(
        <ReaderLoginContext.Provider value={value}>
            {props.children}
        </ReaderLoginContext.Provider>
    );
}

export default ReaderLoginContextProvider;