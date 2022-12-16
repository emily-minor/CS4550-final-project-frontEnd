import { useEffect, useState} from "react";
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

export const API_URL = `https://api.thecatapi.com/v1`;
export const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

const HOME_API_QUERY = `/images/search?limit=24&size=small&has_breeds=1`;

// NOTE: this code is based on this code from:
// https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
// to help create a search bar


function Search() {
    const [searchVal, setSearchVal] = useState("");
    const [error, setError] = useState(false);
    const [dict, setDict] = useState([]);
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [mainPanelData, setMainPanelData] = useState([]);

    // get breeds from Cat API
    useEffect(() => {
        const fetchData = async () => {
            const breeds = await fetch(API_URL+'/breeds',
                {headers: {
                        'x-api-key': API_KEY
                    }})
            const json = await breeds.json();
            const d = {}
            json.forEach(b => {
                d[b.name] = b.id
            });
            console.log(d)
            setDict(d);
        }
        fetchData()
            .catch(console.error);
    }, [])


    useEffect(() => {
        if (triggerSearch) {
            setError(false);
            setTriggerSearch(false)
            // find the id from the dict:
            const bid = dict[searchVal];
            // console.log('bid=', bid)
            if (bid) {
            const fetchCatAPIData = async () => {
                console.log('fetching...');
                let url_to_use = API_URL + HOME_API_QUERY + "&breed_ids=" + bid

                // console.log('USING URL', url_to_use)
                const catsData = await fetch(url_to_use,
                {headers: {
                'x-api-key': API_KEY
                }})
                const json = await catsData.json();
                // console.log('json:', json);
                setMainPanelData(json);
            }
            
            fetchCatAPIData().catch(console.error);
            } else {
                setError(true);
                setMainPanelData([])
            }
        }
      }, [triggerSearch])


    return(


    <div className="container">
          <div className="header row mt-3">
              <h2 className="title col-10">Search for a breed🐱</h2>
              
              <form id="form" role="search" method="GET" name="form">
                <input
                    placeholder="Search"
                    size="sm"
                    onChange={(e) => setSearchVal(e.target.value)}
                />

                <Button onClick={() => {
                    console.log('SEARCHING...')
                    setTriggerSearch(true)
                }}>Search</Button>
        </form>

          </div>
          <div className="panels row">
              <div className="col-9">
              {error ? <Alert severity="error">Invalid Breed Name. Please Try Again.</Alert> : ''}
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
          </div>
      </div>
    );

}

export default Search

