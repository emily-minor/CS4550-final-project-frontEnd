import React, { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {AuthContext} from "../../contexts/context";
import {useAuth} from "../../contexts/context";

function Profile() {
    // const [user, setCurrentUser] = useState(false);
    const auth = useContext(AuthContext);
    const { logout, user } = useAuth();

    useEffect(() => {
        console.log(logout)
        console.log(user)
    }, [auth])


    return(
        <div>
            <h2>Profile</h2>
            <Button onClick={logout}>Log Out</Button>
        </div>
    )
}
export default Profile

