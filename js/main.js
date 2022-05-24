// Inicio Sesión
class NewUser{
    constructor(user, pass, carrito){
        this.user = user;
        this.pass = pass;
        this.carrito = carrito;
    }
}
//              - Agregar Usuario
let sendRegister = document.querySelector("#sendRegister");
sendRegister.addEventListener("click", (e)=>{
    e.preventDefault();
    newUsers();
})
const newUsers = () => {
    let user = document.querySelector("#usuarioRegister").value;
    let pass = document.querySelector("#passRegister").value;
    let carrito = [];
    let user1 = new NewUser(user,pass,carrito);
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(user1);
    localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
    Swal.fire({
        icon: 'success',
        title: 'Excellent!',
        text: 'New account creation was successful'
    })
    registerOverlay.classList.remove("open");
}
//              - Iniciar sesión
let sendLogin = document.querySelector("#sendLogin");
sendLogin.addEventListener("click", (e)=>{
    e.preventDefault();
    login();
})
function login(){
    let ingreso = false;
    let field1 = document.querySelector("#usuarioLogin").value;
    let field2 = document.querySelector("#passLogin").value;
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    /*  Utilizar LocalStorage para ingresar (En proceso)  */
    for (let i = 0; i < listaUsuarios.length; i++) {
        if((field1 === listaUsuarios[i].user) && (field2 === listaUsuarios[i].pass)){
            ingreso = true;
        }
    }
    if(ingreso == true){
        Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'Login was successful'
        })
        loginOverlay.classList.remove("open");
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'the data entered is incorrect'
        })
    }    
}
// Llamar función para Agregar Usuarios mediante link
let crearCuenta = document.querySelector("#cuentaNueva");
let registerOverlay = document.querySelector(".register__overlay");
const closeBtnRegister = document.querySelector("#close-btn-register");
crearCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
    if(registerOverlay.classList.contains("open")){
        registerOverlay.classList.remove("open");
    }else{
        registerOverlay.classList.add("open");
    }
})
/* Evento cerrar modal clickeando fuera */
registerOverlay.addEventListener("click", (e)=>{
    if(e.target.classList.contains("register__overlay")){
        registerOverlay.classList.remove("open");
    }
})
closeBtnRegister.addEventListener("click",()=>{
    registerOverlay.classList.remove("open");
})
// Login Modal
// Llamar función para Iniciar Sesión mediante link
let ingresarCuenta = document.querySelector("#ingresarCuenta");
const loginOverlay = document.querySelector(".login__overlay");
const closeBtnLogin = document.querySelector("#close-btn-login");
ingresarCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
    if(loginOverlay.classList.contains("open")){
        loginOverlay.classList.remove("open");
    }else{
        loginOverlay.classList.add("open");
    }
})
/* Evento cerrar modal clickeando fuera */
loginOverlay.addEventListener("click", (e)=>{
    if(e.target.classList.contains("login__overlay")){
        loginOverlay.classList.remove("open");
    }
})
closeBtnLogin.addEventListener("click",()=>{
    loginOverlay.classList.remove("open");
})

// Productos
class Producto {
    constructor(id,nombre,precio,img,stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.stock = stock;
    }
//          - Descuento 10%
    descuento10(){
        if(this.precio >2000) {
            this.precio = this.precio * 0.9;
            return this.precio;
        }
    }
//          - Detalle del producto
    detalleProd() {
        let resumen = `El nombre del producto es ${this.nombre} y el valor es $${this.precio}`;
        return resumen;
    };
}
// Console log lista productos
const listaProductos = () => {
    let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
    for (const {nombre: n, precio: p} of listaProductos) {
        console.log(`Nombre de Producto: ${n}, Precio: $${p}`);
    }
}
// Copiar arreglo
const copiarArreglo = (array) => {
    let copia = [...array];
    return copia;
}
// Ordenar lista
const ordenarLista = () =>{
    let lista = JSON.parse(localStorage.getItem("productos")) || [];
    lista.sort(((a, b) => a.id - b.id));
    console.log(lista)
    localStorage.setItem("productos", JSON.stringify(lista));
}
//          - Agregar Producto Nuevo
const agregarProducto = () => {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let id = prompt("Ingrese id del producto");
    let nombre = prompt("Ingrese nombre del producto");
    let precio = parseInt(prompt("Ingrese el valor"));
    let img = prompt("Ingrese ruta de imagen");
    let stock = 0;
    let prod = new Producto(id,nombre,precio,img,stock);
    productos.push(prod);
    localStorage.setItem("productos",JSON.stringify(productos));
    ordenarLista();
}
//          - Eliminar Producto
const eliminarProducto = (item) =>{
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let index = productos.indexOf(item);
    //si existe lo borra
    if (index != -1) {
        productos.splice(index, 1);
        localStorage.setItem("productos",JSON.stringify(productos));
    }
}
// Crear Producto desde Panel
const agregarProductoPanel = () => {
    let id = parseInt(document.getElementById("id").value);
    let nombre = document.getElementById("producto").value;
    let precio = parseInt(document.getElementById("valor").value);
    let ruta = document.getElementById("rutaImg").value;
    let stock = parseInt(document.getElementById("stock").value);
    let prod = new Producto(id,nombre,precio,ruta,stock);
    let prods = JSON.parse(localStorage.getItem("productos")) || [];
    prods.push(prod);
    console.log(prods);
    localStorage.setItem("productos",JSON.stringify(prods));
    ordenarLista();
}
const crearProdAdmin = document.querySelector("#btnCrearProducto");
if (crearProdAdmin !== null){
    crearProdAdmin.addEventListener("click", (e)=>{
        e.preventDefault();
        agregarProductoPanel();
        location.reload();
    });
}
// Fetch inventario
const database = "inventario.json";
const userList = "usuarios.json"
const obtenerDatos = async ()=>{
    try{
        let datos = await fetch(database);
        let response = await datos.json();
        let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
        if(listaProductos = []){
            listaProductos = response;
            localStorage.setItem("productos",JSON.stringify(listaProductos));
        }
    } catch(error){
        console.log(error);
    }
}
const obtenerUsuarios = async ()=>{
    try{
        let datos = await fetch(userList);
        let response = await datos.json();
        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if(listaUsuarios = []){
            listaUsuarios = response;
            localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
        }
    } catch(error){
        console.log(error);
    }
}
obtenerUsuarios();
obtenerDatos();
