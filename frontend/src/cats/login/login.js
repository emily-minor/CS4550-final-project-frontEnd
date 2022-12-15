import {useAuth} from "../../contexts/context";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    // const [error, setError] = useState(false);

    const submit = async () => {
        try {
            const res = await login(username, password);
            console.log('logged in!', res)
            navigate("/");
        } catch (error) {
            console.log(username, password);
            console.log(error);
            setError(true)
        }
    };

    return(
        <div >
            <h2>Login</h2>
        {error ? <Alert severity="error">Invalid Credentials</Alert> : ''}
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
            label="Username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
                return
            }}
            />
            <TextField
            className="row"
            id="outlined-name"
            label="Password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
                return
            }}
            type="password"
            />
            <Button className="row" disabled={!username || !password} onClick={() => submit()} variant="contained">Log In</Button>
        </Box>

            <div>
                <p>
                    Don't have an account? Sign up{" "}
                    <Link to="/register">
                        <u>here</u>
                    </Link>{" "}
                    !
                </p>
            </div>
        </div>
    )
}
export default Login