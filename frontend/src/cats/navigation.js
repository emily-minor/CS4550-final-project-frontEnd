import {Link} from "react-router-dom";
import React, { useContext } from 'react';
import {useLocation} from "react-router";
import {AuthContext} from "../contexts/context";

const Navigation = () => {
    const {pathname} = useLocation()
    const parts = pathname.split('/')
    const auth = useContext(AuthContext);
    
    // console.log(parts)
    return(
        <ul className="nav nav-pills">
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
    )
}

export default Navigation