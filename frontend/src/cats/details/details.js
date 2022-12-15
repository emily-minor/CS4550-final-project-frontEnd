const API_URL = `https://api.thecatapi.com/v1/images/6he`;
const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

fetch(API_URL,{headers: {
        'x-api-key': API_KEY
    }})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // <div className="image-grid col-12"/>
            let image = document.createElement('img');
            image.src = `${data.url}`;
            image.id = "foo"
            console.log("~~~~~~~~~~~~~~~~~~~~~")
            console.log("data id: " + data.id);
            console.log("data url: " + data.url);
            console.log("------");
            console.log("img id: " + image.id);
            console.log("img src: " + image.src);
            console.log("------");

            let gridCell = document.createElement('div');
            gridCell.classList.add('col');
            gridCell.classList.add('col-lg');

            // gridCell.appendChild(image)
            //
            // document.getElementById('grid').appendChild(gridCell);

        })

function Details() {
    return (
        <div>
            <h2>Details</h2>
            <h2>got id</h2>
            hu

            <div id="img" className="card-img"></div>
        </div>

    )
}
export default Details
