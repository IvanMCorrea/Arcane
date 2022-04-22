const usuarios = [];
const productos = [];
const carrito = [];
let total = 0;
productos = JSON.parse(localStorage.getItem("productos")) || [];
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
    return new NewUser(user,pass);
}

//              - Iniciar sesión
function login(user,pass){
    let intentos = 3;
    alert("Inicie Sesión");
    let field1 = prompt("Ingrese nombre de usuario");
    let field2 = prompt("Ingrese contraseña");
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
crearCuenta.addEventListener("click", ()=>{
    const cuenta1 = newUsers();
    usuarios.push(cuenta1);
    console.log(usuarios);
})
// Llamar función para Iniciar Sesión mediante link
let ingresarCuenta = document.querySelector("#ingresarCuenta");
ingresarCuenta.addEventListener("click", ()=>{
    login(usuarios[0].user,usuarios[0].pass);
})

// Productos
class Producto {
    constructor(nombre,precio) {
        this.nombre = nombre;
        this.precio = precio;
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
    let prod = new Producto(nombre,precio);
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
localStorage.setItem("productos",JSON.stringify(productos));
console.log(productos);

// Exportar
export { Producto };