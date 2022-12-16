import {Link} from "react-router-dom";
import React, { useContext } from 'react';
import {useLocation} from "react-router";
import {AuthContext} from "../contexts/context";
import {useAuth} from "../contexts/context";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Navigation = () => {
    const {pathname} = useLocation();
    const parts = pathname.split('/');
    const auth = useContext(AuthContext);
    const { logout }= useAuth();
    const navigate = useNavigate();
    // console.log(parts)
    return(
        <div className="row pt-1">
        <ul className="nav nav-pills col-10">
            <li className="nav-item">
                <Link to="/"
                      className={`nav-link ${parts[1] === ''?'active': ''}`}>
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/search"
                      className={`nav-link ${parts[1] === 'search'?'active': ''}`}>
                    Search
                </Link>
            </li>
            {auth.user ?
                <li className="nav-item">
                    <Link to="/profile"
                        className={`nav-link ${parts[1] === 'profile'?'active': ''}`}>
                            My Profile
                    </Link>
                </li> 
                : ""}
            {!auth.user ?
                <li className="nav-item float-end">
                <Link to="/login"
                      className={`nav-link ${parts[1] === 'login'?'active': ''}`}>
                        Log in
                </Link>
            </li>
                : ""}
        </ul>

        <div className="col-2"> 
            <Button 
            variant="outlined"
            onClick={() => {
                logout();
                navigate("/");
                return
            }}>Log Out</Button>
        </div>
        
        </div>
    )
}

export default Navigation