const API_URL = `https://api.thecatapi.com/v1/images/search?limit=5`;
const API_KEY = "live_i4AlnomPIvkmpQj0FlbDiUFBnxJX6SUNuP7VNcbH1B7s19Onxn3vYzynt285VM1k"

fetch(API_URL,{headers: {
    'x-api-key': API_KEY
  }})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let imagesData = data;
    imagesData.map(function(imageData) {
      
      let image = document.createElement('img');
      image.src = `${imageData.url}`;
          
      let gridCell = document.createElement('div');
      gridCell.classList.add('col');
      gridCell.classList.add('col-lg');

      gridCell.appendChild(image)
        
      document.getElementById('grid').appendChild(gridCell);

      
      });
  })

function Homepage() {
    return(
        <div className="container">
            <div className="header row mt-3">
                <h2 className="title col-10">Cats App</h2>
                <button type="button" className="btn btn-primary col-1">Log In</button>
            </div>
            <div className="panels row">
                <div className="main-panel col-8">
                    <p>cats pulled from API</p>
                    <div id="grid" class="imgrid"></div>
                </div>
                <div className="right-panel col-4">
                    <p>activity list</p>
                </div>
            </div>
        </div>
    )
}
export default Homepage