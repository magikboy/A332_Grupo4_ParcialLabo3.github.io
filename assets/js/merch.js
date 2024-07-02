document.addEventListener("DOMContentLoaded", () => {
  generarCards(productosJson);
});

function generarCards(productos) {
  const container = document.getElementById("container-merch");
  container.innerHTML = "";
  let cardsHTML = "";

  productos.forEach((producto) => {
    cardsHTML += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card bg-secondary">
                        <img src="${producto.imagen}" class="card-img-top" alt="Imagen de ${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio: $${producto.precio}</p>
                        </div>
                    </div>
                </div>
            `;
  });

  container.innerHTML = cardsHTML;
}

let productosJson = [
  {
    nombre: "The Beatles",
    precio: 20000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "Queen",
    precio: 23000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "Pink Floyd",
    precio: 18000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "The Rolling Stones",
    precio: 22000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "Soda Stereo",
    precio: 19000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "Los Fabulosos Cadillacs",
    precio: 17000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "AC/DC",
    precio: 25000,
    imagen: "assets/img/merch/1.png",
  },
  {
    nombre: "Guns N' Roses",
    precio: 21000,
    imagen: "assets/img/merch/1.png",
  },
];
