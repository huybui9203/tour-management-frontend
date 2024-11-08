import { createContext, useState } from "react";

export const GlobalContext = createContext();
const Auth = ({ children }) => {
    const idCancelTour = (idTour) => {
        setTimeout(() => {

        }, 15 * 1000 * 60);
    };

    return <GlobalContext.Provider value={{  }}>{children}</GlobalContext.Provider>;
};

export default Auth;
