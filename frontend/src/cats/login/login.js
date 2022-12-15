import {useAuth} from "../../contexts/context";
import {Link} from "react-router-dom";

import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Login() {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(false);

    const submit = async () => {
        try {
            await login(username, password);
        } catch (error) {
            console.log(username, password);
            console.log(error);
        }
    };

    return(
        <div >
            <h2>Login</h2>

        <Box
            className="pt-10 d-grid"
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
            className="row"
            id="outlined-name"
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
            className="row"
            id="outlined-name"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            />
            <Button className="row" disabled={!username || !password} onClick={() => submit()} variant="contained">Log In</Button>
        </Box>

            <div>
                <text>
                    Don't have an account? Sign up{" "}
                    <Link to="/register">
                        <u>here</u>
                    </Link>{" "}
                    !
                </text>
            </div>
        </div>
    )
}
export default Login