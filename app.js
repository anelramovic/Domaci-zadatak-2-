//prikazFilma - prikaz filma 
//formaZaUnos = formaZaUnos
//pozadina - pozadina

const prikazFilma = document.getElementById("prikazFilma");
const formaZaUnos = document.getElementById("formaZaUnos");
const uspjesnoDodatFilm = document.getElementById("uspjesnoDodatFilm");
const dodavanjeFilma = document.getElementById("dodavanjeFilma");
const pozadina = document.getElementById("pozadina");

const createMovieInputs = {
  naslov: document.getElementsByName("naslov")[0],
  godina: document.getElementsByName("godina")[0],
  drzava: document.getElementsByName("drzava")[0],
  napomena: document.getElementsByName("napomena")[0],
  glumci: document.getElementsByName("glumci")[0],
};

const filmovi = [
  {
    odgledano: false,
    naslov: "Interstellar",
    godina: 2014,
    drzava: "SAD",
    napomena: "tekst",
    glumci: ["Matthew McConaughey", "En Hatavej"],
  },
  {
    odgledano: false,
    naslov: "Shutter Island",
    godina: 2010,
    drzava: "SAD",
    napomena: "tekst",
    glumci: ["Leonardo di Caprio", "Chuck Aule"],
  },
  {
    odgledano: false,
    naslov: "The Invisible Guest",
    godina: 2016,
    drzava: "SAD",
    napomena: "tekst",
    glumci: ["Ana Wagener", "Tomas Garido"],
  },
];

function prikaziFilmove() {
  let movieRows = [];

  filmovi.forEach((movie, index) => movieRows.push(movieRow(movie, index)));

  prikazFilma.innerHTML = movieRows.join("");
}

function movieRow(movie, index) {
  let watchedCheckboxChecked = movie.odgledano ? "checked" : "";
  let rowClassNames = "movie-row";

  if (movie.odgledano) {
    rowClassNames += " odgledano";
  }

  return `<tr id="row${index}" class="${rowClassNames}">
    <td><input type="checkbox" ${watchedCheckboxChecked} onchange="vecOdgledano(event, ${index})"/></td>
    <td>${movie.naslov}</td>
    <td>${movie.godina}</td>
    <td>${movie.drzava}</td>
    <td>${movie.napomena}</td>
    <td>${movie.glumci.join("<br>")}</td>
    </tr>`;
}

function vecOdgledano(event, index) {
  let isChecked = event.target.checked;
  let movieRow = document.getElementById(`row${index}`);

  filmovi[index].odgledano = isChecked;

  if (filmovi[index].odgledano) {
    movieRow.classList.add("odgledano");
  } else {
    movieRow.classList.remove("odgledano");
  }
}

function dodajFilm(event) {
  event.preventDefault();

  let uneseneInformacije = {};

  Object.keys(createMovieInputs).forEach(
    (inputName) => (uneseneInformacije[inputName] = createMovieInputs[inputName].value)
  );

  if (!validacijaForme(uneseneInformacije)) {
    return;
  }

  let movie = {
    odgledano: false,
    naslov: uneseneInformacije.naslov,
    godina: parseInt(uneseneInformacije.godina),
    drzava: uneseneInformacije.drzava,
    napomena: uneseneInformacije.napomena,
    glumci: uneseneInformacije.glumci.split(","),
  };

  filmovi.push(movie);
  prikaziFilmove();

  formaZaUnos.reset();
  reset(false);

  prikaziUspjesnoDodateFilmove();
}

function validacijaForme(movie) {
  let greske = {
    naslov: null,
    godina: null,
    glumci: null,
  };

  if (movie.naslov.length < 1) {
    greske.naslov = "Morate unijeti naziv filma";
  }

  if (isNaN(movie.godina)) {
    greske.godina = "Film mora biti broj";
  } else if (!(parseInt(movie.godina) > 1930 && parseInt(movie.godina) < 2021)) {
    greske.godina = "Film mora biti napravljen u periodu od 1930-2021";
  }

  if (movie.glumci === "") {
    greske.glumci = "Film mora imati makar 1 glumca";
  }

  for (let property of Object.keys(greske)) {
    if (!(greske[property] === null)) {
      prikaziGreske(greske);
      return false;
    }
  }

  return true;
}

function prikaziGreske(greske) {
  for (let property of Object.keys(greske)) {
    let errorMessage = greske[property];
    let errorSpan = document.getElementById(`error-${property}`);

    if (!(errorMessage == null)) {
      errorSpan.classList.remove("d-none");
      errorSpan.innerHTML = errorMessage;
    } else {
      errorSpan.innerHTML = "";
      errorSpan.classList.add("d-none");
    }
  }
}

function prikazi() {
  pozadina.classList.remove("d-none");
  dodavanjeFilma.style.display = "block";
  dodavanjeFilma.classList.add("show");
}

function reset(resetErrorInputs) {
  pozadina.classList.add("d-none");
  dodavanjeFilma.style.display = "none";
  dodavanjeFilma.classList.remove("show");

  if (resetErrorInputs) {
    let inputs = document.getElementsByClassName("input-error");

    for (let input of inputs) {
      input.innerHTML = "";
      input.classList.add("d-none");
    }
  }
}

function prikaziUspjesnoDodateFilmove() {
  uspjesnoDodatFilm.classList.remove("d-none");

  setTimeout(() => {
    uspjesnoDodatFilm.classList.add("d-none");
  }, 3000);
}