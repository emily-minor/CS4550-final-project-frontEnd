import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {useAuth} from "../../contexts/context";
import {API_URL, API_KEY} from "../homepage/homepage";

const CAT_BACKEND_API_BASE = "http://localhost:4000"
const USERS_API = `${CAT_BACKEND_API_BASE}/users`;
const NON_EDIT_FIELDS = ['admin', 'followers', 'following', 'joined']

function Profile() {
    // const [user, setCurrentUser] = useState(false);
    const [error, setError] = useState(false);
    const [infoChanged, setInfoChanged] = useState(false);
    const [fieldsToHide, setFieldsToHide] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const { logout, login, user } = useAuth();
    const navigate = useNavigate();

    const [updatedUser, setUpdatedUser] = useState(user[0]);

    // get breeds from Cat API
    useEffect(() => {
        const fetchData = async () => {
            const breeds = await fetch(API_URL+'/breeds',
                {headers: {
                        'x-api-key': API_KEY
                    }})
            const json = await breeds.json();
            setBreeds(json);
        }
        fetchData()
            .catch(console.error);
    }, [])

    useEffect(() => {
        setUpdatedUser(user[0])
        const isAdmin = user[0]['admin']
        if (isAdmin) {
            setFieldsToHide(['_id', 'followers', 'following', 'favBreeds'])
        } else {
            setFieldsToHide(['_id', 'admin', 'followers', 'following', 'favBreeds'])
        }
    }, [user])

    function onChangeField(key, newval) {
        setUpdatedUser(prevState => {
            let copy = Object.assign({}, prevState); 
            copy[key] = newval;                              
            return copy;            
          })
        setInfoChanged(true)
    }

    const performUpdate = async () => {
        console.log(updatedUser)
        try {
            const res = await axios.put(`${USERS_API}/${updatedUser._id}`, updatedUser);
            // console.log('updating user info', res)
            try {
                const res = await login(updatedUser.username, updatedUser.password);
                console.log('logged in!', res)
                
            } catch (error) {
                console.log(error);
                setError(true)
            }
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
            <h2>User Information:</h2>
            {Object.keys(updatedUser).map((k) => 
            {
                if (fieldsToHide.includes(k)) {
                    return null
                } else {
                    return <TextField
                    key={k}
                    className="row"
                    id="outlined-name"
                    label={k}
                    value={updatedUser[k]}
                    disabled={NON_EDIT_FIELDS.includes(k)}
                    type={k === "password" ? "password" : ""}
                    onChange={(e) => {
                        onChangeField(k, e.target.value);
                        setInfoChanged(true)
                    }}
                />
                }

            })}

            <h2>Your Favorite Breeds:</h2>
            {/* <ul>
                {
                breeds.map((breed, index) => {
                    const favs = updatedUser.favBreeds 
                    const fav =  favs.includes(breed.id)
                    return <div key={index}>
                        <input type="checkbox"
                                key={breed.id}
                                id={breed.id}
                                name={breed.name}
                                checked={fav}
                                onChange={() =>
                                {
                                    if (fav) {
                                        favs.delete(breed.id);
                                        // setUpdatedUser((prev) => prev.favBreeds = favs)
                                        // setNewFavBreeds(new Set(favs))
                                    } else{
                                        favs.add(breed.id)
                                        // setNewFavBreeds(new Set(favs))
                                    }
                                    // const oldList = newFavBreeds
                                    // const newList = fav ? oldList.delete(breed.id) : oldList.push(breed.id);
                                    // console.log(newList)
                                    // setNewFavBreeds(newList)
                                    setInfoChanged(true)

                                }}
                        />
                        <label htmlFor={breed.name}>{breed.name}</label>
                    </div>
                }
                    
                    )}
                </ul> */}
            
            <Button className="row" disabled={!infoChanged} onClick={() => performUpdate()} variant="contained">Save Changes</Button>
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

