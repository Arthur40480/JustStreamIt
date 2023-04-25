/* Url de base de l'API */
const mainUrl = "http://localhost:8000/api/v1/titles/"

/* Element du DOM de la section du meilleur film */
const movieImgElt = document.getElementsByClassName("best-movie-img")[0];
const movieTitleElt = document.getElementsByClassName("best-movie-title")[0];
const movieDescriptionElt = document.getElementsByClassName("best-movie-description")[0];
const movieButton = document.getElementsByClassName("best-movie-button-info")[0];

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
function fetchBestMovie() {
    
    fetch(mainUrl + "?sort_by=-imdb_score")
        .then(response => response.json())
        .then(data => {
            let urlBestMovie = data["results"][0]["url"];
            fetch(urlBestMovie)
                .then(response => response.json())
                .then(data => {
                    movieImgElt.src = data["image_url"];
                    movieTitleElt.innerHTML = data["title"];
                    movieDescriptionElt.innerHTML = data["description"];
                })
        }) 
    movieButton.addEventListener('click', openModal);
}

/* Fonction pour récupérer les données du meilleur film et les afficher dans la fenêtre modale */
function fetchDataMovieForModal() {
    
    fetch("http://localhost:8000/api/v1/titles/2646")
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

function openModal() {

    let modalWindow = document.getElementsByClassName("modal")[0];
    let buttonClose = document.getElementsByClassName("modal-button-close")[0];

    fetchDataMovieForModal()

    modalWindow.style.display = "block";

    buttonClose.onclick = function () {
        modalWindow.style.display = "none";
    }
}




fetchBestMovie()