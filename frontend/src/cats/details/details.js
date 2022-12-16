import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const API_URL = `https://api.thecatapi.com/v1/images`;
const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

function Details() {
    const params = useParams();
    console.log(params); 

    const [allDetails, setDetails] = useState();
    const [allBreedInfo, setBreedInfo] = useState({});
    const [breedName, setBreedName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const details = await fetch(API_URL + `/${params.dId}/`,
            {headers: {
            'x-api-key': API_KEY
            }})
            const json = await details.json();
            setDetails(json)
            const breedinfo = json['breeds'][0]
            const breedname = json['breeds'][0]['name']
            console.log('breed info:', breedinfo);
            console.log('breed name:', breedname);
            setBreedInfo(breedinfo)
            setBreedName(breedname)
        }
        
        fetchData()
        .catch(console.error);
    }, [params])


    return (
        <div>
            {(!params.dId || !allDetails) ? 
                <p> "Loading Details..." </p> 
                :
                <div className='row'>
                    <h2 className='pb-3 pt-3'>Cat Details 👉️</h2> 
                    <div className='col-6'>
                    <h2>This cat is a {breedName}! </h2>
                    <img
                          alt="a cat" 
                          src={allDetails.url}
                          loading="lazy"
                          width={400}
                          className='pb-2'
                        />
                    
                    <h4>{allBreedInfo['description'] ?? ""}</h4>
                    </div>
                    <div className='col-6'>
                    <BasicTable breed={breedName} breedInfoObject={allBreedInfo}></BasicTable>
                    </div>
                </div>
            }
        </div>

    )
}

function BasicTable({breed, breedInfoObject}) {
    const keyz = Object.keys(breedInfoObject).sort()
    const v = breedInfoObject[keyz[0]]
    console.log('v=', v)

    return (
      <Table aria-label="simple table">
          <h2>Breed Details</h2>
          <TableBody>
            {keyz.map((k) => (
                (k === 'reference_image_id' || 
                k === 'id' || 
                k === 'description' || 
                k === 'name' || 
                k === 'vetstreet_url' || 
                k === 'cfa_url') ? '' :
              <TableRow
                key={k}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {k}
                </TableCell>
                <TableCell align="right">{typeof breedInfoObject[k] === 'object' ? "BLAH"
                : breedInfoObject[k]}</TableCell>
              </TableRow>
              )
            
            )}
          </TableBody>
        </Table>
    );
  }

export default Details
