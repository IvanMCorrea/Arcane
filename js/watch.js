const videos = "caps.json";
const obtenerVideos = async ()=>{
    try{
        let datos = await fetch(videos);
        let response = await datos.json();
        let listaVideos = JSON.parse(localStorage.getItem("videos")) || [];
        if(listaVideos = []){
            listaVideos = response;
            localStorage.setItem("videos",JSON.stringify(listaVideos));
        }
        publicarVideos();
    } catch(error){
        console.log(error);
    }
}
obtenerVideos();
const publicarVideos = () =>{
    let storage = JSON.parse(localStorage.getItem("videos"));
    for (let i=0; i < storage.length; i++){
        let nodo = document.createElement("div");
            nodo.innerHTML = `
                <h2 class="listaVideos__item--title">S${storage[i].S} E${storage[i].E}</h2>
                <img src="${storage[i].img}" alt="${storage[i].Title}" class="listaVideos__item--img">
                <h3 class="listaVideos__item--title">${storage[i].Title}</h3>
                <p class="">${storage[i].Desc}</p>
            `
            nodo.className = "listaVideos__item";
            document.getElementById("watch").appendChild(nodo);
    }
}