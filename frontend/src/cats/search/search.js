import {useState} from "react";

const f = document.getElementById('form');
let q = document.getElementById('query');
const google = 'https://www.google.com/search?q=site%3A+';
const site = 'pagedart.com';

// NOTE: this code is based on this code from:
// https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
// to help create a search bar


function searchButton(searchVal) {
    var button = document.createElement('BUTTON');
    button.addEventListener("click", submitted(searchVal));
    return(
        <button>
            Search
        </button>
    )
}

function Search() {
    const [searchVal, setSearch] = useState("");
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

function submitted(searchVal) {
    // event.preventDefault();

    console.log(searchVal)
    // const a = document.getElementsByName("form");

}


export default Search

