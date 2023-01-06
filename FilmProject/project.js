const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url"); 
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



// UI Objesini başlatma

const ui = new UI();

const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

cardbody.addEventListener("click",deleteFilm);
clear.addEventListener("click",clearAllFilms);

}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title == "" || director == "" || url== ""){
        //Hata
        ui.displayMessage("Please fill all the boxes!","danger")
    }
    else {
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // arayüze film ekleme
        storage.addFilmToStorage(newFilm); // storage'a film ekleme
        ui.displayMessage("New film added!","success")
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        ui.displayMessage("Film is deleted!","success")
    }

}

function clearAllFilms(){

    if(confirm("Are you sure ?")){
        ui.clearAllFilmsFromUI()
        storage.clearAllFilmsFromStorage();
    }
}
