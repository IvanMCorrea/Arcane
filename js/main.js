const usuarios = [];
const productos = [];

// Inicio Sesión
class NewUser{
    constructor(user, pass){
        this.user = user;
        this.pass = pass;
    }
}
const newUsers = () => {
    alert("Cree cuenta nueva");
    let user = prompt("Ingrese nombre de usuario");
    let pass = prompt("Ingrese contraseña");
    alert("Cuenta nueva creada!");
    return new NewUser(user,pass);
}
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
const cuenta1 = newUsers();
// Array que contiene usuario ingresado 
usuarios.push(cuenta1);
console.log(usuarios);
console.log(cuenta1);
login(cuenta1.user,cuenta1.pass);
// Productos
class Producto {
    constructor(nombre,precio) {
        this.nombre = nombre;
        this.precio = precio
    }
}
// Productos - Agregar Producto Nuevo
const agregarProducto = () => {
    let nombre = prompt("Ingrese nombre del producto");
    let precio = parseInt(prompt("Ingrese el valor"));
    let prod = new Producto(nombre,precio);
    productos.push(prod);
}
productos.push(new Producto("Llavero Carapescado", 500));
productos.push(new Producto("Poster Arcane", 500));
productos.push(new Producto("Figura Jinx", 5000));
productos.push(new Producto("Blu-Ray", 250));
console.log(productos)