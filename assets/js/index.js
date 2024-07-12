document.addEventListener("DOMContentLoaded", () => {
  objData.forEach((element) => {
    getAlbumData(
      element.artist,
      element.album,
      element.container,
      renderizarDiscos
    );
  });
});

const getAlbumData = (artist, album, htmlElement, callback) => {
  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      callback(data, htmlElement);
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud Fetch:", error);
    });
};

const renderizarDiscos = (data, htmlElement) => {
  let container = document.querySelector(`#${htmlElement}`);

  container.innerHTML += `
        <a class="d-block foto-item" data-fancybox="images"
            data-caption="<strong>Album:</strong> ${data.album.name}<br><strong>Artist:</strong> ${data.album.artist}<br><strong>Date:</strong> ${data.album.wiki?.published}<br><strong>Genre:</strong> ${data.album.tags.tag[0].name}<br><a href='${data.album.url}' target='_blank'>Escuchar</a>"
            href="${data.album.image[3]["#text"]}">
            <img class="img-fluid" src="${data.album.image[4]["#text"]}"
                alt="Radiohead - In Rainbows">
        </a>
    `;
};

const objData = [
  {
    artist: "Radiohead",
    album: "In Rainbows",
    container: "discosContainer_1",
  },
  {
    artist: "Lou Reed",
    album: "Transformer",
    container: "discosContainer_1",
  },
  {
    artist: "Fleet Foxes",
    album: "Fleet Foxes",
    container: "discosContainer_1",
  },
  {
    artist: "C418",
    album: "Minecraft Volume Alpha",
    container: "discosContainer_1",
  },
  {
    artist: "Almendra",
    album: "Almendra",
    container: "discosContainer_2",
  },
  {
    artist: "Aphex Twin",
    album: "Selected Ambient Works 85-92",
    container: "discosContainer_2",
  },
  {
    artist: "Gustavo Cerati",
    album: "Bocanada",
    container: "discosContainer_2",
  },
  {
    artist: "Björk",
    album: "Post",
    container: "discosContainer_2",
  },
  {
    artist: "Black Midi",
    album: "Cavalcade",
    container: "discosContainer_3",
  },
  {
    artist: "toe",
    album: "the book about my idle plot on a vague anxiety",
    container: "discosContainer_3",
  },
  {
    artist: "The Beatles",
    album: "Abbey Road",
    container: "discosContainer_3",
  },
  {
    artist: "Black Country, New Road",
    album: "Ants from up there",
    container: "discosContainer_3",
  },
  {
    artist: "Bob Dylan",
    album: "The Freewheelin' Bob Dylan",
    container: "discosContainer_4",
  },
  {
    artist: "Joy Division",
    album: "Unknown Pleasures",
    container: "discosContainer_4",
  },
  {
    artist: "Sufjan Stevens",
    album: "Illinois",
    container: "discosContainer_4",
  },
  {
    artist: "The Smiths",
    album: "The Queen is Dead",
    container: "discosContainer_4",
  },
];

const API_KEY = "764e182f707520ab665370da3ef6a7fd";
const Shared_secret = "9a2d87fe42388cb4dde134db7ccbf7b0";
