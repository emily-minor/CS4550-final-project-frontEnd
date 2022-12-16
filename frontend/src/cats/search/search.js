import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../contexts/context";

export const API_URL = `https://api.thecatapi.com/v1`;
export const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

const HOME_API_QUERY = `/images/`;

// NOTE: this code is based on this code from:
// https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
// to help create a search bar


function Search() {
    const auth = useContext(AuthContext);
    const [searchVal, setSearch] = useState("");

    // if panel with search results
    const [mainPanelData, setMainPanelData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const details = await fetch(API_URL + HOME_API_QUERY + searchVal,
                {headers: {
                        'x-api-key': API_KEY
                    }})
            // const json = await details.json();
            // setDetails(json)
            // const breedinfo = json['breeds'][0]
            // const breedname = json['breeds'][0]['name']
            // setBreedInfo(breedinfo)
            // setBreedName(breedname)
        }

        fetchData()
            .catch(console.error);
    },
        // [params]
        )

    //
    // useEffect(() => {
    //     let url_to_use = API_URL + HOME_API_QUERY + searchVal
    //     if (auth.user) {
    //         const loggedInUser = auth.user[0] !== undefined ? auth.user[0] : auth.user;
    //         setLoggedIn(true)
    //         setCurrentUser(loggedInUser)
    //
    //         const fetchCatAPIData = async () => {
    //             console.log('fetching main content...');
    //             url_to_use = url_to_use + "&breed_ids=" + loggedInUser.favBreeds.join();
    //             console.log('USING URL', url_to_use)
    //             const catsData = await fetch(url_to_use,
    //                 {headers: {
    //                         'x-api-key': API_KEY
    //                     }})
    //             const json = await catsData.json();
    //             setMainPanelData(json);
    //         }
    //
    //         fetchCatAPIData().catch(console.error);
    //
    //     } else {
    //         setLoggedIn(false)
    //
    //         const fetchCatAPIData = async () => {
    //             console.log('fetching main content...');
    //             const catsData = await fetch(url_to_use,
    //                 {headers: {
    //                         'x-api-key': API_KEY
    //                     }})
    //             const json = await catsData.json();
    //             setMainPanelData(json);
    //         }
    //
    //         fetchCatAPIData().catch(console.error);
    //     }
    // }, [auth])

    // --------------------------
    return(
        <form id="form" role="search" method="GET" name="form">
            <h2>Search</h2>

            <input
                placeholder="Search"
                size="sm"
                onChange={(e) => setSearch(e.target.value)}
            />

            {searchButton(searchVal)}
        </form>
    );
}

function searchButton(searchVal) {
    var button = document.createElement('BUTTON');
    button.addEventListener("click", submitted(searchVal));
    return(
        <button>
            Search
        </button>
    )
}

function submitted(searchVal) {
    // event.preventDefault();

    console.log(searchVal)
    // const a = document.getElementsByName("form");

}


export default Search

