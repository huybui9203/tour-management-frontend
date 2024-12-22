import { createContext, useState } from "react";
import { ROLES } from "../utils/constants";

export const AuthContext = createContext();
const Auth = ({ children }) => {
    const [user, setLocalUser] = useState(() => {
        if(JSON.parse(localStorage.getItem("user"))?.role !== ROLES.USER) {
            return null
        }
        return JSON.parse(localStorage.getItem("user"));
    });

    const setUser = (data) => {
        setLocalUser(() => {
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        });
    };
    const logoutUser = () => {
        setLocalUser("");
        localStorage.removeItem("user");
    };

    return <AuthContext.Provider value={{ user, setUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export default Auth;
