/* Url de base de l'API */
const mainUrl = "http://localhost:8000/api/v1/titles/"

/* Url pour afficher les meilleurs films par catégorie */
const categoryUrl = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre="

/* Element du DOM de la section du meilleur film */
const movieImgElt = document.getElementsByClassName("best-movie-img")[0];
const movieTitleElt = document.getElementsByClassName("best-movie-title")[0];
const movieDescriptionElt = document.getElementsByClassName("best-movie-description")[0];
const movieButtonModalElt = document.getElementsByClassName("best-movie-button-info")[0];


/* Element du DOM contenant les carousel des différentes catégories */
const carouselContainerElt = document.getElementsByClassName("carousel-container")[0];

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
                    movieButtonModalElt.addEventListener("click", function() {
                        openModal(bestId[0])
                    }) 
                })
        })
}

/**
 * Récupération des données d'un livre via sont ID
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
 * Récupération des 7 meilleurs films d'une catégorie
 * @param {string} category 
 */
async function fetchMovieCategoryData(category) {

    let movieCategory = []

    await fetch(categoryUrl + category)
        .then(response => response.json())
        .then(data => {
            for(i = 0; i < data["results"].length; i++) {
                movieCategory.push(data["results"][i]);
            }
            if(movieCategory.length < 7) {
                fetch(data["next"])
                    .then(response => response.json())
                    .then(data => {
                        const nbrOfMovies = movieCategory.length;
                        for(i = nbrOfMovies; i < 7; i++) {
                            movieCategory.push(data["results"][(i - nbrOfMovies)]);
                        }
                    })
            }
        })
    return movieCategory;
}

/**
 * Création de la section qui accueillera le carousel dans le DOM
 * @param {String} category 
 */
async function buildCarousel(category) {

    const listMovie = await fetchMovieCategoryData(category)

    const categoryContainerElt = document.createElement("section");
    categoryContainerElt.classList.add("section-carousel-movie");
    carouselContainerElt.append(categoryContainerElt);

    const categoryMovieTitleElt = document.createElement("h2");
    categoryMovieTitleElt.classList.add("category-title");
    categoryMovieTitleElt.innerHTML = category;
    categoryContainerElt.append(categoryMovieTitleElt);

    const carouselElt = document.createElement("div");
    carouselElt.classList.add("container-carousel-movie");
    categoryContainerElt.append(carouselElt);

    const buttonLeftElt = document.createElement("button");
    buttonLeftElt.classList.add("left-button");
    buttonLeftElt.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    carouselElt.append(buttonLeftElt);

    const movieContainerElt = document.createElement("div");
    movieContainerElt.classList.add("movie-container");
    carouselElt.append(movieContainerElt);

    buildMovieCarousel(listMovie, movieContainerElt);
    
    const buttonRightElt = document.createElement("button");
    buttonRightElt.classList.add("right-button");
    buttonRightElt.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    carouselElt.append(buttonRightElt);
}

/**
 *  Création du carousel dans le DOM
 * @param {String} category 
 * @param {Object} container 
 */
function buildMovieCarousel(listMovie, containerElt) {
    listMovie.forEach((movie) => {
        
        const id = movie["id"];
        const title = movie["title"];

        const containerMovieElt = document.createElement("div");
        containerMovieElt.classList.add("container-button-img-movie");
        
        const imgMovieElt = document.createElement("img");
        imgMovieElt.classList.add("img-carousel");
        imgMovieElt.src = movie["image_url"];

        const titleMovieElt = document.createElement("p");
        titleMovieElt.classList.add("category-movie-title");
        titleMovieElt.innerHTML = title;

        const buttonPlayMovieElt = document.createElement("button");
        buttonPlayMovieElt.classList.add("category-movie-button-play");
        buttonPlayMovieElt.innerHTML = '<i class="fa-solid fa-play"></i>Play';
        const buttonInfoMovieElt = document.createElement("button");
        buttonInfoMovieElt.classList.add("category-movie-button-info");
        buttonInfoMovieElt.innerHTML = '<i class="fa-solid fa-circle-info"></i>Info';

        buttonInfoMovieElt.addEventListener("click", function() {
            openModal(id)
        });
        
        containerMovieElt.append(imgMovieElt, titleMovieElt ,buttonPlayMovieElt, buttonInfoMovieElt)
        containerElt.append(containerMovieElt)
    });
}

/**
 * Fonction pour ouvrir et fermer la fenêtre modale 
 * @param {Number} id 
 */
function openModal(id) {

    let modalWindow = document.getElementById("modal");
    let buttonClose = document.getElementsByClassName("modal-button-close")[0];
    
    fetchDataMovieForModal(id);

    modalWindow.style.display = "block";
    
    buttonClose.onclick = function () {
        modalWindow.style.display = "none";
    }
}

fetchBestMovie()
buildCarousel("horror")
buildCarousel("action")