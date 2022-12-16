import React, { useState, useCallback } from "react";
import { AuthContext, useAuth } from "./context";
import {instance} from "../api";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    // console.log(process.env.REACT_APP_API_BASE)

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
    }, []);

    const login = useCallback(async (username, password) => {
        try {
            const res = await instance.post("http://localhost:4000/login", {username, password});
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log(res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, []);

    const register = useCallback(async (body) => {
        const res = await instance.post(process.env.REACT_APP_API_BASE+"/register", body);
        console.log(res.data['_id']);
        try {
            const user = await instance.get(
                process.env.REACT_APP_API_BASE+`/users/${res.data['_id']}`
            );
            setUser(user.data);
            localStorage.setItem("user", JSON.stringify(user.data));
            console.log(user);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, []);

    //

    return (
        <AuthContext.Provider value={{ user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;