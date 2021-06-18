import React, { useState,useEffect } from 'react'
import LoginContext from './LoginContext'
function LoginContextProvider(props) {

    const[isLoggedIn,setLogin]=useState();
    const value={
        isLoggedIn,
        setLogin,
    }
    return (
       <LoginContext.Provider value={value}>
         {props.children}
       </LoginContext.Provider>
    )
}

export default LoginContextProvider
