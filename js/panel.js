// Crear Producto desde Panel
import { Producto } from './main.js';
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const agregarProductoPanel = () => {
    let nombre = document.getElementById("producto").value;
    let precio = parseInt(document.getElementById("valor").value);
    let prod = new Producto(nombre,precio);
    productos.push(prod);
    console.log(productos);
}
const crearProdAdmin = document.querySelector("#btnCrearProducto");
crearProdAdmin.addEventListener("click", (e)=>{
    e.preventDefault();
    agregarProductoPanel();
})
