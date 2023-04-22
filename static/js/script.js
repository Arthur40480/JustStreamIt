const mainUrl = "http://localhost:8000/api/v1/titles/"

function fetchBestMovie() {
    
    let bestImg = document.getElementsByClassName("best-movie-img")[0];
    let bestTitle = document.getElementsByClassName("best-movie-title")[0];
    console.log(bestImg)
    let bestDescription = document.getElementsByClassName("best-movie-description");

    fetch(mainUrl + "?sort_by=-imdb_score")
        .then(response => response.json())
        .then(data => {
            let bestMovie = data["results"][0]
            console.log(bestMovie)
            bestTitle.innerHTML = bestMovie["title"]
            bestImg.src = bestMovie["image_url"]
            
        })
}

fetchBestMovie()