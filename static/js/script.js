/* Url de base de l'API */
const mainUrl = "http://localhost:8000/api/v1/titles/"

/* Url pour afficher les meilleurs films par catégorie */
const categoryUrl = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre="

/* Element du DOM de la section du meilleur film */
const movieImgElt = document.getElementsByClassName("best-movie-img")[0];
const movieTitleElt = document.getElementsByClassName("best-movie-title")[0];
const movieDescriptionElt = document.getElementsByClassName("best-movie-description")[0];


/* Element du DOM de la fenêtre modale */
const modalTitleElt = document.getElementsByClassName("modal-title")[0];
const modalGenreElt = document.getElementsByClassName("modal-genre")[0];
const modalDurationElt = document.getElementsByClassName("modal-duration")[0];
const modalCountryElt = document.getElementsByClassName("modal-country")[0];
const modalYearElt = document.getElementsByClassName("modal-release-year")[0];
const modalRatedElt = document.getElementsByClassName("modal-rated")[0];
const modalLmdbElt = document.getElementsByClassName("modal-lmdb")[0];
const modalBoxOfficeElt = document.getElementsByClassName("modal-box-office")[0];
const modalDirectorElt = document.getElementsByClassName("modal-director")[0];
const modalActorElt = document.getElementsByClassName("modal-actor")[0];
const modalDescriptionElt = document.getElementsByClassName("modal-description")[0];
const modalImgElt = document.getElementsByClassName("modal-img")[0];

/* Fonction pour récupérer les données du meilleur film */
async function fetchBestMovie() {
    let bestId = []

    await fetch(mainUrl + "?sort_by=-imdb_score")
        .then(response => response.json())
        .then(data => {
            let url = data["results"][0]["url"];
            let id = data["results"][0]["id"];
            bestId.push(id)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    movieImgElt.src = data["image_url"];
                    movieTitleElt.innerHTML = data["title"];
                    movieDescriptionElt.innerHTML = data["description"];
                    
                })
        })
    openModal(bestId[0])
}

/**
 * Fonction pour récupérer les données du meilleur film et les afficher dans la fenêtre modale
 * @param {Number} id 
 */
function fetchDataMovieForModal(id) {
    
    fetch(mainUrl + id)
        .then(response => response.json())
        .then(data => {
            modalTitleElt.innerHTML = " " + data["title"];
            modalGenreElt.innerHTML = " " + data["genres"];
            modalDurationElt.innerHTML= " " + data["duration"] + "min"; 
            modalCountryElt.innerHTML = " " + data["countries"]; 
            modalYearElt.innerHTML = " " + data["year"];
            modalRatedElt.innerHTML = " " + data["rated"]; 
            modalLmdbElt.innerHTML = " " + data["imdb_score"] + " / 10";
            modalBoxOfficeElt.innerHTML = " " + data["worldwide_gross_income"]; 
            modalDirectorElt.innerHTML = " " + data["directors"];
            modalActorElt.innerHTML = " " + data["actors"];
            modalDescriptionElt.innerHTML = " " + data["description"];
            modalImgElt.src = data["image_url"];
        })
}

/**
 * On récupère les données des 7 meilleurs films d'une catégorie
 * @param {string} category 
 */
async function fetchMovieCategoryData(category) {

    let movieCategory = []

    await fetch(categoryUrl + "horror")
        .then(response => response.json())
        .then(data => {
            for(i = 0; i < data["results"].length; i++) {
                movieCategory.push(data["results"][i]);
                console.log(data["results"][i]);
            }
            if(movieCategory.length < 7) {
                fetch(data["next"])
                    .then(response => response.json())
                    .then(data => {
                        const nbrOfMovies = movieCategory.length
                        for(i = nbrOfMovies; i < 7; i++) {
                            movieCategory.push(data["results"][(i - nbrOfMovies)]);
                            console.log(movieCategory)
                        }
                        buildCarousel(movieCategory)
                    })
            }
        })
}

/**
 * On viens créer le carousel d'une catégorie composé de 7 films
 * @param {string} category 
 */
function buildCarousel(category) {
    let container = document.getElementsByClassName("movie-container")[0];
    console.log(container)

    category.forEach((movie) => {
        console.log(movie.image_url)
        const movieContainer = document.createElement('div');
        container.append(movieContainer);
        const imgMovie = document.createElement('img');
        imgMovie.classList.add("img-carousel")
        movieContainer.append(imgMovie);
        imgMovie.src = movie["image_url"];
    });
}

/**
 * Fonction pour ouvrir la fenêtre modale 
 * @param {Number} id 
 */
function openModal(id) {

    let modalWindow = document.getElementsByClassName("modal")[0];
    let buttonClose = document.getElementsByClassName("modal-button-close")[0];
    let movieButton = document.getElementsByClassName("best-movie-button-info")[0];
    
    fetchDataMovieForModal(id)
    
    movieButton.onclick = function () {
        modalWindow.style.display = "block";
    }

    buttonClose.onclick = function () {
        modalWindow.style.display = "none";
    }
}

fetchBestMovie()
fetchMovieCategoryData()