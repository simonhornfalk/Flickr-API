const btn = document.querySelector(".btn");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);


btn.addEventListener("click", async function(){

    const search = document.getElementById("search").value;
    if (search == "")
    {
        alert("Cant search for nothing")
    }
    else {


    const searchFetchLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=019c08acc2e04a0deeebe722bf6fe1e5&text=" + search + "&sort=relevance&per_page=20&format=json&nojsoncallback=1";
    const response = await fetch(searchFetchLink);
    const data = await response.json();

    GetPhotos(data);
    AddToLightbox();

    }

});

IfPressEnter();

function GetPhotos(data) {

    for (let i = 0; i < 10; i++)
    {
    const imgID = i;
    const serverId = data.photos.photo[i].server;
    const id = data.photos.photo[i].id;
    const secret = data.photos.photo[i].secret;
    const farmId = data.photos.photo[i].farm;
    const sizeSuffix = "q";

    const fetchLink = "https://live.staticflickr.com/" + serverId + "/" + id + "_" + secret + "_" + sizeSuffix + ".jpg";

    const tempImg = document.getElementById("img" + imgID);
    tempImg.innerHTML = "";
    src = fetchLink;
    img = document.createElement("img");
    img.src = src;
    tempImg.append(img);
}

}
function AddToLightbox() {
    const images = document.querySelectorAll("a");
    images.forEach(image => {
    image.addEventListener("click", e => {
        lightbox.classList.add("active");
        const img = document.createElement("img");
        img.src = image.lastChild.src;
        img.src = img.src.replace("q", "b");
        
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    })
})
lightbox.addEventListener("click", e => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
})

}
function IfPressEnter() {

    var input = document.getElementById("search");
    input.addEventListener("keyup", async function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        
        const search = document.getElementById("search").value;
        if (search == "")
        {
            alert("Cant search for nothing")
        }
        else {
    
    
        const searchFetchLink = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=019c08acc2e04a0deeebe722bf6fe1e5&text=" + search + "&sort=relevance&per_page=20&format=json&nojsoncallback=1";
        const response = await fetch(searchFetchLink);
        const data = await response.json();
    
        GetPhotos(data);
        AddToLightbox();
    
        }
      }
    });
    
}








