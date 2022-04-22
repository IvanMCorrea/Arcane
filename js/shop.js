const productos = JSON.parse(localStorage.getItem("productos")) || [];
productos.forEach(el => {
    let nodo = document.createElement("div");
    nodo.innerHTML = `
        <h3>${el.nombre}</h3>
        <p>Price $${el.precio}</p>
    `
    nodo.className = "proyectos__cards--card col";
    document.getElementById("cards").appendChild(nodo);
})