import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {AuthContext} from "../../contexts/context";
import {useAuth} from "../../contexts/context";

const CAT_BACKEND_API_BASE = "http://localhost:4000"
const USERS_API = `${CAT_BACKEND_API_BASE}/users`;
const NON_EDIT_FIELDS = ['admin', 'followers', 'following', 'joined']

function Profile() {
    // const [user, setCurrentUser] = useState(false);
    const auth = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [infoChanged, setInfoChanged] = useState(false);
    const [fieldsToHide, setFieldsToHide] = useState([]);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const [updatedUser, setUpdatedUser] = useState(user[0]);

        
    useEffect(() => {
        setUpdatedUser(user[0])
        const isAdmin = user[0]['admin']
        if (isAdmin) {
            setFieldsToHide(['_id', 'followers', 'following'])
        } else {
            setFieldsToHide(['_id', 'admin', 'followers', 'following'])
        }
    }, [user])

    useEffect(() => {
        console.log(updatedUser)
    }, [updatedUser])

    const updateUserInfo = async () => {
        try {
            const res = await axios.put(`${USERS_API}/${user._id}`, updatedUser);
            console.log('updating user info', res)
        } catch (error) {
            console.log(error);
            setError(true)
        }
    };

    return(
        <div >
            <h2>My Profile</h2>
            {error ? <Alert severity="error">Could not save</Alert> : ''}
        <Box
            className="pt-10 d-grid"
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {Object.keys(updatedUser).map((k) => 
            {
                if (fieldsToHide.includes(k)) {
                    return null
                } else {
                    return <TextField
                    className="row"
                    id="outlined-name"
                    label={k}
                    value={updatedUser[k]}
                    disabled={NON_EDIT_FIELDS.includes(k)}
                    type={k === "password" ? "password" : ""}
                    onChange={(e) => {
                        // setUsername(e.target.value);
                        setError(false);
                        return
                    }}
                />
                }

            })}
            
            <Button className="row" disabled={infoChanged} onClick={() => updateUserInfo()} variant="contained">Save Changes</Button>
        </Box>

        <Button onClick={() => {
            logout();
            navigate("/");
            return
        }}>Log Out</Button>
            
        </div>
    )
}
export default Profile

