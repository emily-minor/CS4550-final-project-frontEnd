import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {useAuth} from "../../contexts/context";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const CAT_BACKEND_API_BASE = "http://localhost:4000"
const USERS_API = `${CAT_BACKEND_API_BASE}/users`;

function Profile() {
    const params = useParams();
    const [allDetails, setDetails] = useState(false);

    const [error, setError] = useState(false);
    const [fieldsToHide, setFieldsToHide] = useState([]);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const { user, login } = useAuth();
    const loggedInUser = user[0] !== undefined ? user[0] : user;
    const [updatedUser, setUpdatedUser] = useState(loggedInUser);
    // const navigate = useNavigate();


    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`${USERS_API}/${params.uid}`);
        // const json = await userData.json();
        setDetails(res.data)
      }
      fetchUser().catch(console.error);
    }, [params])

    useEffect(() => {
      setUpdatedUser(loggedInUser)
      const isAdmin = loggedInUser['admin']
      if (isAdmin) {
          setFieldsToHide(['_id', 'favBreeds', '__v'])
      } else {
          setFieldsToHide(['_id', 'admin', 'joined', 'favBreeds', '__v'])
      }
  }, [user])

    useEffect(() => {
      if (allDetails) {
        const fetchFollowers = async (username) => {
          const res = await axios.get(`${USERS_API}/byusername/${username}`);
          console.log(res.data)

          setFollowers([res.data])
        }

        const fetchFollowing = async (username) => {
          const res = await axios.get(`${USERS_API}/byusername/${username}`);
          console.log(res.data)

          setFollowing([res.data])
        }
  
        // GET THEIR FOLLOWERS
        allDetails.followers.forEach(f => {
          fetchFollowers(f).catch(console.error);
        });

        allDetails.following.forEach(f => {
          fetchFollowing(f).catch(console.error);
        });
      }
      
    }, [allDetails])


    function followingList(k) {
      if (k === 'followers') {
        return (
          <div>
            {followers.map(f => <a key={k} href={`/profile/${f._id}`}>{f.username} </a>)}
          </div>
        );
      } else {
        return (
          <div>
            {following.map(f => <a key={k} href={`/profile/${f._id}`}>{f.username} </a>)}
          </div>
        );
      }
    }
    
    function UserDataTable({userData}) {
      const keyz = Object.keys(userData).sort()
      return (
        <Table aria-label="simple table">
            <TableBody>
              {keyz.map((k) => (
                  (k === 'admin' || 
                  k === '_id' || 
                  k === 'username' || 
                  k === 'password' || 
                  k === 'favBreeds' ? '' :
                <TableRow
                  key={k}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {k}
                  </TableCell>
                  <TableCell align="right">{k === 'following' || k === 'followers' ? 
                  followingList(k)
                  : userData[k]}</TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
      );
    }
    
    const performUpdate = async () => {
      console.log('the updated user=', updatedUser)
      try {
        const url = 'http://localhost:4000/users/' + updatedUser._id
        console.log('url !!', url)
        const res = await axios.put(`${USERS_API}/${updatedUser._id}`, updatedUser);
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

    function follow(usernameToFollow) {
      // the curr logged in user needs to send post with update
        setUpdatedUser(prevState => {
          let copy = Object.assign({}, prevState); 
          const newVal = copy.following
          newVal.push(usernameToFollow)  
          copy.following = newVal;                                                  
          return copy;            
        })
      performUpdate()
    }

 return (
        <div>
            {(!params.uid || !allDetails) ? 
                <p> "Loading User Details..." </p> 
                :
                <div className='row'>
                    <h2 className='pb-3 pt-3'>User Details 👉️</h2> 
                    <div className='col-6'>
                    <h2>@{allDetails.username}</h2>                    
                    <h4>joined {allDetails.joined ?? "unknown"}</h4>
                    <Button onClick={() => follow(allDetails.username)}>Follow</Button>
                    </div>
                    <div className='col-6'>
                    <UserDataTable userData={allDetails}></UserDataTable>
                    </div>
                </div>
            }
        </div>
    )
}
export default Profile



