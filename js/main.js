// Escucha una sola vez el evento personalizado del catálogo.
let total = 0;

const contador = document.getElementById("contador");
const catalogo = document.querySelector(".catalogo");

catalogo.addEventListener("agregar-al-carrito", (evento) => {
  total += 1;
  contador.textContent = total;

  console.log(
    `Agregado: ${evento.detail.titulo} - $${evento.detail.precio}`
  );
});
