// Contacto
const datosRemitente = () => {
    let remitente = document.getElementById("nombre").value;
    remitente = remitente + document.getElementById("apellido").value;
    let msj = document.getElementById("mensaje").value;
    console.log(remitente);
    console.log(msj);
}
const boton = document.querySelector("#btn");
boton.addEventListener("click", ()=>{
    datosRemitente(); 
})