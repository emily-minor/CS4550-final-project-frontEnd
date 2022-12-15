import React, { useState, useCallback } from "react";
import { AuthContext, useAuth } from "./context";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = useCallback(async (username, password) => {
        try {
            const res = await fetch("/login", {
                method: 'POST',
                user: {
                    username: username,
                    password: password
                }
            });
            setUser(res.data.result[0]);
            localStorage.setItem("user", JSON.stringify(res.data.result[0]));
            console.log(res);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, []);

    // const register = useCallback(async (body) => {
    //     try {
    //         const res = await instance.post("/register", body);
    //         const user = await instance.get(
    //             `/users/${res.data.result.insertId}`
    //         );
    //         setUser(user.data.result[0]);
    //         localStorage.setItem("user", JSON.stringify(user.data.result[0]));
    //         console.log(user);
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }, []);
    //
    // const logout = useCallback(() => {
    //     setUser(null);
    //     localStorage.removeItem("user");
    // }, []);

    return (
        <AuthContext.Provider value={{ user, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;