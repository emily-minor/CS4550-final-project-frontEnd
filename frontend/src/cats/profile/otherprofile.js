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
    
    const { user } = useAuth();
    
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`${USERS_API}/${params.uid}`);
        console.log(res.data)
        // const json = await userData.json();
        setDetails(res.data)
      }
      fetchUser().catch(console.error);
    }, [params])


    useEffect(() => {
      if (allDetails) {
        const fetchFollowers = async (username) => {
          console.log(username)
          const res = await axios.get(`${USERS_API}/byusername/${username}`);
          console.log(res.data)

          setFollowers([res.data])
        }

        const fetchFollowing = async (username) => {
          console.log(username)
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
            {followers.map(f => <a href={`/profile/${f._id}`}>{f.username} </a>)}
          </div>
        );
      } else {
        return (
          <div>
            {following.map(f => <a href={`/profile/${f._id}`}>{f.username} </a>)}
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



