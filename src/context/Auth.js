import { createContext, useState } from "react";

export const AuthContext = createContext();
const Auth = ({ children }) => {
    const [user, setLocalUser] = useState(() => {
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
