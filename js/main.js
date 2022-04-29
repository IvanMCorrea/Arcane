const usuarios = [];
const productos = [];
const carrito = [];
let total = 0;
// Inicio Sesión
class NewUser{
    constructor(user, pass){
        this.user = user;
        this.pass = pass;
    }
}
//              - Agregar Usuario
const newUsers = () => {
    alert("Cree cuenta nueva");
    let user = prompt("Ingrese nombre de usuario");
    let pass = prompt("Ingrese contraseña");
    alert("Cuenta nueva creada!");
    let user1 = new NewUser(user,pass);
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(user1);
    localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
    console.log(listaUsuarios);
}

//              - Iniciar sesión
function login(){
    let intentos = 3;
    alert("Inicie Sesión");
    let field1 = prompt("Ingrese nombre de usuario");
    let field2 = prompt("Ingrese contraseña");
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let user = listaUsuarios[0].user;
    let pass = listaUsuarios[0].pass;
    /*  Utilizar LocalStorage para ingresar (En proceso) 
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    while (intentos > 0 ) {
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (field1 == listaUsuarios[i.user] && field2 == listaUsuarios[i.pass]) {
                alert("Bienvenido/a");
                console.log("Bienvenido/a");
                intentos = 0;
            }else{
                alert(`Datos incorrectos, le quedan ${intentos} intentos`);
                field1 = prompt("Ingrese nombre de usuario");
                field2 = prompt("Ingrese contraseña");
                intentos--;
            }
        }
    } */
    while (((field1 != user) || (field2 != pass)) && intentos > 0 ) {
        alert(`Datos incorrectos, le quedan ${intentos} intentos`);
        field1 = prompt("Ingrese nombre de usuario");
        field2 = prompt("Ingrese contraseña");
        intentos--;
    }
    if (intentos > 0) {
        alert("Bienvenido/a");
        console.log("Bienvenido/a");
    }else{
        alert("Acceso denegado");
        console.log("Acceso denegado");
    }
}
// Llamar función para Agregar Usuarios mediante link
let crearCuenta = document.querySelector("#cuentaNueva");
crearCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
    newUsers();
})
// Llamar función para Iniciar Sesión mediante link
let ingresarCuenta = document.querySelector("#ingresarCuenta");
ingresarCuenta.addEventListener("click", (e)=>{
    e.preventDefault();
    login();
})

// Productos
class Producto {
    constructor(nombre,precio, img) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
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
//          - Agregar Producto Nuevo
const agregarProducto = () => {
    let nombre = prompt("Ingrese nombre del producto");
    let precio = parseInt(prompt("Ingrese el valor"));
    let img = prompt("Ingrese ruta de imagen");
    let prod = new Producto(nombre,precio,img);
    productos.push(prod);
    localStorage.setItem("productos",JSON.stringify(productos));
}
//          - Eliminar Producto
const eliminarProducto = (item) =>{
    let index = productos.indexOf(item);
    //si existe lo borra
    if (index != -1) {
        productos.splice(index, 1);
        localStorage.setItem("productos",JSON.stringify(productos));
    }
}
// Crear Producto desde Panel
const agregarProductoPanel = () => {
    let nombre = document.getElementById("producto").value;
    let precio = parseInt(document.getElementById("valor").value);
    let ruta = document.getElementById("rutaImg").value;
    let prod = new Producto(nombre,precio,ruta);
    let prods = JSON.parse(localStorage.getItem("productos")) || [];
    prods.push(prod);
    console.log(prods);
    localStorage.setItem("productos",JSON.stringify(prods));
}
const crearProdAdmin = document.querySelector("#btnCrearProducto");
if (crearProdAdmin !== null){
    crearProdAdmin.addEventListener("click", (e)=>{
        e.preventDefault();
        agregarProductoPanel();
    });
}

// Carrito (en proceso)
//          - Agregar al Carrito
const agregarCarrito = (item) =>{
    let index = productos.indexOf(item);
    //si existe lo agrega al carrito
    if (index != -1) {
        carrito.push(productos[index]);
    }
}
//          - Eliminar del Carrito
const quitarCarrito = (item) =>{
    let index = carrito.indexOf(item);
    //si existe lo elimina del carrito
    if (index != -1) {
        carrito.splice(index,1);
    }
}
//          - Total Carrito
for (const prod of carrito){
    total = total + parseInt(prod.precio);
}
console.log(productos);