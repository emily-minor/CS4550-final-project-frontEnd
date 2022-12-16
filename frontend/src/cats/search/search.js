const f = document.getElementById('form');
const q = document.getElementById('query');
const google = 'https://www.google.com/search?q=site%3A+';
const site = 'pagedart.com';

// NOTE: this code is based on this code from:
// https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
// to help create a search bar

function submitted() {
    // event.preventDefault();
    console.log("hello")
    // const url = google + site + '+' + q.value;
    // const win = window.open(url, '_blank');
    // win.focus();
}

function searchButton() {
    var button = document.createElement('BUTTON');
    button.addEventListener("click", submitted());
    return(
        <button>
            Search
        </button>
    )
}

function searchBar() {
    return(
        <form id="form" role="search">
            <link rel="stylesheet" href="./searchBar.css"/>
            <h2>Search</h2>
            <input type="search" id="query" name="" placeholder="Search up some cats :)"/>
            {searchButton()}
        </form>

    );
}

function Search() {
    return(
        searchBar()
    );

}export default Search

