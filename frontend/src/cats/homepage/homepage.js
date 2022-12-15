import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "./styles.css"

const API_URL = `https://api.thecatapi.com/v1/images/search?limit=24&size=small`;
const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

function Homepage(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setCurrentUser] = useState(
      {
        username: "catluver88",
        favbreeds: []
      }
    );

  // if !loggedIn, random cats
  // if loggedIn, cats of ur fav_breeds
  const [mainPanelData, setMainPanelData] = useState([]);

  // if !loggedIn, activityList is list of n most recent ppl who have joined (registered)
  // if loggedIn, activityList is most recent activity of you and your followers
  const [activityList, setActivityList] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      const catsData = await fetch(API_URL,
        {headers: {
        'x-api-key': API_KEY
        }})
      const json = await catsData.json();
      setMainPanelData(json);
    }
  
    fetchData()
    .catch(console.error);
    }, [])

    return(
        <div className="container">
            <div className="header row mt-3">
                <h2 className="title col-10">Cats FYP</h2>
            </div>
            <div className="panels row">
                <div className="col-9">
                    {loggedIn ? 
                      <p>Hey @{user.username}! Here are some cats of your favorite breeds:</p>
                      : <p>Hey stranger! Log in or register to see your customized cats homepage</p>
                    }
                    <ImageList cols={3}>
                    {mainPanelData.map((pic) => (
                      <ImageListItem key={pic.id}>
                        <img
                          alt="a cat" 
                          src={pic.url}
                          loading="lazy"
                          width={400}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>

                </div>
                <div className="right-panel col-md">
                    <p>Activity List:</p>
                </div>
            </div>
        </div>
    )
}
export default Homepage