import React, { useContext, useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import "./styles.css"
import {AuthContext} from "../../contexts/context";

const CATS_API_URL = `https://api.thecatapi.com/v1/images/search?limit=24&size=small&has_breeds=1`;
const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

function Homepage() {
  const auth = useContext(AuthContext);

  const [loggedIn, setLoggedIn] = useState();
  const [user, setCurrentUser] = useState(false);

  // if !loggedIn, random cats
  // if loggedIn, cats of ur fav_breeds
  const [mainPanelData, setMainPanelData] = useState([]);

  // if !loggedIn, activityList is list of n most recent ppl who have joined (registered)
  // if loggedIn, activityList is most recent activity of you and your followers
  const [activityList, setActivityList] = useState([]); 

  useEffect(() => {
    const fetchActivityListData = async () => {
      // console.log('fetching activity list...');
      const response = await axios.get("http://localhost:4000/recent");
      setActivityList(response.data)
    }
  
    fetchActivityListData().catch(console.error);
  }, [])

  useEffect(() => {
    if (auth.user) {
      setLoggedIn(true)
      setCurrentUser(auth.user[0])

      const fetchCatAPIData = async () => {
        console.log('fetching main content...');
        let url_to_use = CATS_API_URL + "&breed_ids=" + auth.user[0].favBreeds.join();
        console.log('USING URL', url_to_use)
        const catsData = await fetch(url_to_use,
          {headers: {
          'x-api-key': API_KEY
          }})
        const json = await catsData.json();
        setMainPanelData(json);
      }
    
      fetchCatAPIData().catch(console.error);

    } else {
      setLoggedIn(false)

      const fetchCatAPIData = async () => {
        console.log('fetching main content...');
        const catsData = await fetch(CATS_API_URL,
          {headers: {
          'x-api-key': API_KEY
          }})
        const json = await catsData.json();
        setMainPanelData(json);
      }
    
      fetchCatAPIData().catch(console.error);
    }
  }, [auth])

  return(
      <div className="container">
          <div className="header row mt-3">
              <h2 className="title col-10">Cats FYP 🐱</h2>
          </div>
          <div className="panels row">
              <div className="col-9">
                  {loggedIn ? 
                    <p>Hey @{user.username}! Here are some cats of your favorite breeds:</p>
                    : <p>Hey stranger! Log in or register to see your customized cats homepage</p>
                  }
                  <ImageList cols={3}>
                  {mainPanelData.map((pic) => (
                    <Link key={pic.id} href={`/details/${pic.id}`}>
                    <ImageListItem >
                      <img
                        alt="a cat"
                        src={pic.url}
                        loading="lazy"
                        width={400}
                      />
                    </ImageListItem>
                    </Link>
                  ))}
                </ImageList>

              </div>
              <div className="right-panel col-md">
                <h4 className="title col-10">
                  Recent Activity:
                </h4>


                <Table aria-label="simple table">
                  <TableBody>
                    {activityList.map((user) => (
                        
                      <TableRow
                        key={user._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                        {`@${user.username} joined on ${user.joined.substring(0, 10)}`}
                        </TableCell>
                      </TableRow>

                    ))}
                  </TableBody>
                </Table>

              </div>
          </div>
      </div>
    )
}
export default Homepage