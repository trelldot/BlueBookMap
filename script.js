(function(){

'use strict'
console.log("Reading JS");

let timer;
const timeoutTime = 30000;
const events = ['click', 'keydown', 'mouesdown','touchstart', 'scroll', 'mousemove'];

let overlay = document.getElementById("overlay");
const overlayTitle = document.querySelector("#overlay-title");
const overlayContent = document.querySelector("#overlay-content");
const overlaySubheading = document.querySelector("#overlay-subheading");
const topbar = document.querySelector("#topBar");
const start = document.querySelector("#start");
const intro = document.querySelector("#intro");
const mapdiv =document.querySelector("#mapdiv");
const resetdiv = document.querySelector("#resetdiv");
const resetbutton = document.querySelector("#reset");
// const nextbutton= document.querySelector("#nextbutton");
let overlayIMG = document.querySelector("#hamburger");
let redX = document.querySelector("#x");
const menu = document.querySelector("#menu");
const tabs = document.querySelectorAll(".tab");
const mainTitle = document.querySelector("#mainTitle");
let currentClass = "";
let currentIndex = 0;
let currentMarker= null;


const markersByClass = {};

//base content for filters and about tab

const contentData = {
    about: {
        title: "About the BlueBook",
        content: "BlueBook is a collection of travel narratives documenting global Black experiences.",
        backgroundColor: "linear-gradient(90deg,rgb(229, 236, 194) 0%, rgb(229, 236, 194) 40%, rgba(226, 241, 108, .2) 90%)"
    },
    filters: {
        title: "Filter Stories",
        content: "Use the filters to explore different types of narratives based on themes like romance, hiking, and more.",
        backgroundColor: "linear-gradient(90deg, #98d5df 0%,  #98d5df 20%, rgba(226, 241, 108, .2) 50%)"
    },

    photos: {
        title: "Click a photo to learn more!",
        content: `
            <div id="photo-grid" class="photo-gallery">
                <img src="images/photoguides/yudis.jpg" alt="Yudis" class="photo-thumbnail"  data-marker-class="yudis" data-marker-index="0"/>
                <img src="images/photoguides/yudis1.jpg" alt="Yudis2" class="photo-thumbnail"  data-marker-class="yudis" data-marker-index="1"/>
                <img src="images/photoguides/yudis2.jpg" alt="@john_jcm" class="photo-thumbnail" data-marker-class="yudis" data-marker-index="2"/>
                <img src="images/photoguides/ostual1.jpg" alt="Ostual" class="photo-thumbnail" data-marker-class="music" data-marker-index="0"/>
                <img src="images/photoguides/petroniocrowd.jpg" alt="petroniocrowd" class="photo-thumbnail" data-marker-class="petronio" data-marker-index="0"/>
                <img src="images/photoguides/@luisawebb.jpg" alt="Luisa" class="photo-thumbnail" data-marker-class="meetUp" data-marker-index="0"/>
                <img src="images/photoguides/mirardorelcielo2.jpg" alt="Mirardor El Cielo1" class="photo-thumbnail" data-marker-class="scenery" data-marker-index="1"/>
                <img src="images/photoguides/caliscape1.jpg" alt="Cali1" class="photo-thumbnail" data-marker-class="petronio" data-marker-index="3"/>
                <img src="images/photoguides/@isabellatorres.jpg" alt="Isabella" class="photo-thumbnail" data-marker-class="meetUp" data-marker-index="1"/>
                <img src="images/photoguides/modelosgroup1.jpg" alt="Meetuphroup" class="photo-thumbnail" class="photo-thumbnail" data-marker-class="meetUp" data-marker-index="2"/>
                <img src="images/photoguides/@rossmenaaa.jpg" alt="Ross" class="photo-thumbnail" class="photo-thumbnail" data-marker-class="meetUp" data-marker-index="3"/>
                <img src="images/photoguides/laspalmassegundo.jpg" alt="las palmas" class="photo-thumbnail" data-marker-class="scenery" data-marker-index="2" />
                <img src="images/photoguides/musician1.jpg" alt="hornplayer" class="photo-thumbnail"  data-marker-class="music" data-marker-index="1"/>
                <img src="images/photoguides/jeff1.jpg" alt="Jeff" class="photo-thumbnail" class="photo-thumbnail" data-marker-class="meetUp" data-marker-index="4"/>
                <img src="images/photoguides/caliscape2.jpg" alt="Cali2" class="photo-thumbnail" data-marker-class="petronio" data-marker-index="4"/>
                <img src="images/photoguides/petronio1.jpg" alt="petronio1" class="photo-thumbnail" data-marker-class="petronio" data-marker-index="1"/>
                <img src="images/photoguides/petronio2.jpg" alt="petronio2" class="photo-thumbnail" data-marker-class="petronio" data-marker-index="2"/>
                <img src="images/photoguides/yudis4.jpg" alt="yudismodels" class="photo-thumbnail" data-marker-class="yudis" data-marker-index="4"/>
                <img src="images/photoguides/katharsis.jpg" alt="katharsis" class="photo-thumbnail"  data-marker-class="music" data-marker-index="2"/>
                <img src="images/photoguides/yudis3.jpg" alt="@sabhaisbella.jpg" class="photo-thumbnail" data-marker-class="yudis" data-marker-index="3"/>
                <img src="images/photoguides/uvalaimagnicaion.jpg" alt="uva" class="photo-thumbnail" data-marker-class="scenery" data-marker-index="3" />
                <img src="images/photoguides/mirardorelcielo.jpg" alt="Mirardor El Cielo1" class="photo-thumbnail" data-marker-class="scenery" data-marker-index="0" />
                
                

            </div>`,
        backgroundColor: "linear-gradient(90deg,rgb(243, 209, 154) 0%,rgb(254, 218, 161) 20%, rgba(246, 155, 8, .2) 70%)"
    }
};

//close overlay on initialization

overlay.style.display="none";



//hamburger menu shows overlay and nav on click
overlayIMG.addEventListener("click", function () {
    let currentDisplay = window.getComputedStyle(overlay).display;
    
    if (currentDisplay === "none") {
        overlay.style.display = "flex";
        overlayIMG.display="none";
        redX.display="flex";
        menu.style.display="flex";
        mainTitle.style.display="none";
        topbar.classList.add("hidden");
    } else {
        overlay.style.display = "none";
        overlayIMG.src = "images/menu.png";
        menu.style.display="none";
        
    }

    // if (window.innerWidth < 600){
    //     topbar.style.display="none";
    // }
});

redX.addEventListener("click", function(){
    let currentDisplay = window.getComputedStyle(overlay).display;
    if (currentDisplay === "flex") {
        overlay.style.display = "none";
        overlayIMG.display="flex";
        redX.display="none";
        mainTitle.style.display="block";
    }
    if (window.innerWidth < 600){
        topbar.classList.remove("hidden");
    }
    });

document.addEventListener('keydown', function(event){
    if (event.key === "Escape"){
        document.getElementById("overlay").style.display = "none";
        mainTitle.style.display="block";
    }

    if (window.innerWidth < 600){
        topbar.classList.remove("hidden");
    }
});


var map = L.map('map', {
    center: [6.298061666390256, -75.5852508544922],
    zoom: 5,
    minZoom:5,
    zoomControl: false, // Disables the zoom control
    worldCopyJump: true
});

L.control.zoom({
    position: 'bottomleft'
}).addTo(map);

var OpenStreetMap_CAT = L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
});
var Stadia_StamenTerrainLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}' ,  {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

OpenStreetMap_CAT.addTo(map);
Stadia_StamenTerrainLabels.addTo(map);
//bug fixing for placing elements and finding zoom

map.on('click', function(event){
    console.log(event.latlng);
})

map.on('zoomend', function (e) {
    console.log(e.target._zoom);
});

// closing overlay when map is clicked or tapped

map.on('click', function(){
    overlay.style.display="none";
    mainTitle.style.display="inline-block";
    topbar.classList.remove("hidden");
})


//markers styling

var experienceIcon = L.Icon.extend({
    
    options:{
        //The settings are the same besides of the icon url

       
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [48, 48],
        shadowSize: [50, 64], 
        iconAnchor: [24, 48], 
        shadowAnchor: [4, 62], 
        popupAnchor: [0, -48] 
        

    // shadowUrl: 'leaf-shadow.png',
    }  

});

var articleIcon = L.Icon.extend({
    
    options:{
        //The settings are the same besides of the icon url

       
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [48, 48],
        shadowSize: [50, 64], 
        iconAnchor: [24, 48], 
        shadowAnchor: [4, 62], 
        popupAnchor: [0, -48] 
        

    // shadowUrl: 'leaf-shadow.png',

    }  

});

var racismIconLarge = new experienceIcon({iconUrl: 'images/pin1.png', iconSize: [48,48]});
var racismIconSmall = new experienceIcon({iconUrl: 'images/pin1small.png', iconSize: [24,24]});
var hikeIconLarge = new experienceIcon({iconUrl: 'images/pin2.png', iconSize: [48,48]});
var hikeIconSmall = new experienceIcon({iconUrl: 'images/pin2small.png', iconSize: [24,24]});
var romanceIconLarge = new experienceIcon({iconUrl: 'images/pin3.png', iconSize: [48,48]});
var romanceIconSmall = new experienceIcon({iconUrl: 'images/pin3small.png', iconSize: [24,24]});


//keeping icon size consistent when zooming
map.on('zoomend', function () {
    var zoom = map.getZoom();

    const newRomanceIcon = zoom >= 10 ? romanceIconLarge : romanceIconSmall;

    const newHikeIcon = zoom >= 10 ? hikeIconLarge : hikeIconSmall;

    const newRacismIcon = zoom >= 10 ? racismIconLarge : racismIconSmall;

    if (markersByClass["romance"]){
        markersByClass["romance"].forEach(marker => marker.setIcon(newRomanceIcon));
    }
    if (markersByClass["racism"]){
        markersByClass["racism"].forEach(marker => marker.setIcon(newRacismIcon));
    }

    if (markersByClass["hiking"]){
        markersByClass["hiking"].forEach(marker => marker.setIcon(newHikeIcon));
    }


    // var scaleFactor = Math.pow(0.8, 10 - zoom); // Adjust this factor as needed

    // var newSize = [48 * scaleFactor, 48 * scaleFactor];

    // romanceIcon.options.iconSize = newSize;
    // romanceIcon.options.iconAnchor = [newSize[0] / 2, newSize[1]];
});

//function for creating markers with class
function createMarker(lat, lng, icon, markerClass, popup, bodyContent) {
    const marker = L.marker([lat, lng], {icon:icon})
    .bindPopup(popup)

    //storing body content on marker
    marker.bodyContent = bodyContent || "";

    //Stores markers in an object by class name
    if (!markersByClass[markerClass]){
        markersByClass[markerClass]=[];
    }
    markersByClass[markerClass].push(marker);
    marker.addTo(map)
    


    marker.on('click', function (e) {
        
        showOverlay(markerClass, popup);

        mainTitle.style.display="none";

        currentClass = markerClass;
        currentIndex = markersByClass[markerClass].findIndex(m => m ===marker);
        currentMarker = marker;

        const markerLatLng = marker.getLatLng();
        const offsetLatLng = L.latLng(markerLatLng.lat -.00009, markerLatLng.lng - 0.009);

        //make it so that the map only zooms in to level 14 when zoom is 13 or less
        map.flyTo(offsetLatLng, 14, {
            animate: true,
            duration: .5
        });
    });
}


function toggleMarkers(markerClass){
    if (!markersByClass[markerClass]) return;

    markersByClass[markerClass].forEach(marker => {
        if (map.hasLayer(marker)){
            map.removeLayer(marker);
        }
        else{
            marker.addTo(map);
        }
    
        
    });
}




//romance
createMarker(6.191615, -75.547647, romanceIconSmall, "romance", "The Las Palmas viewpoint with hot chocolate. Viewpoints are very romantic.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`);
createMarker(6.232912404724993, -75.60416579246521, romanceIconSmall, "romance", "The Los Molinos Cinema. It was actually my first romantic experience because it was with my first boyfriend. We were both from Quibdó and visited Medellín during Holy Week. I was 13 years old. ", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`);
createMarker(6.236046744209422, -75.5802050727515, romanceIconSmall,"romance", "I had a romantic experience at Pueblito Paisa. It’s a very beautiful viewpoint to go with your partner or friends.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`);
createMarker(6.245775705249648, -75.59561501436937, romanceIconSmall, "romance", "Laureles. It's my really well-known romantic place, my first date. in fact, when I came to Medellín, my first date was at a Starbucks in Laureles.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`);
createMarker(6.2306263965333155, -75.61134874820709, romanceIconSmall, "romance", "The University of Medellín. That’s where I met my boyfriend, so it’s a place that reminds me of how we met.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`);

//hiking

createMarker(6.252693, -75.564734, hikeIconSmall, "hiking", "There’s a spot I think is the best right now: the first Saturday of every month at San Alejo. Visiting the San Alejo Fair at Bolívar Park is amazing. It’s a local crafts fair with handmade goods and trinkets.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`);
createMarker(6.268126, -75.566075, hikeIconSmall, "hiking", "I really like Laureles for taking a walk because of its peaceful parks. I also like the Parque de los Deseos, which is great for relaxing for a while.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`);
createMarker(6.209317, -75.498096, hikeIconSmall, "hiking", "Santa Elena. The rivers and so many places around it, but Santa Elena is truly magical. It’s very beautiful and feels like my peaceful escape.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`);
createMarker(6.209882, -75.497013, hikeIconSmall, "hiking", "Santa Elena is a beautiful place to spend some quality time.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`);

//racism
createMarker(6.212760, -75.577929, racismIconSmall, "racism", "On the metro, on the metro, it’s the daily bread for Black people.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`);
createMarker(6.252651188861533, -75.56458711624147, racismIconSmall, "racism", "On the metro station.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`);
createMarker(6.252651188861533, -75.56458711624147, racismIconSmall, "racism", "Downtown Medellín.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`);
createMarker(6.231548739241308, -75.61130583286287, racismIconSmall, "racism", "At school. They always made comments about my hair, and I was the only Black girl in the class, so you can imagine how it was.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`);
createMarker(6.231470970357367, -75.60997009277345, racismIconSmall, "racism", "It’s a fine line, but I’d say at the university. There was a security guard who always called me “Negra Esmeralda.” While it may not be the most blatantly racist act, the issue was that he didn’t address anyone else in that way.", `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`);

//Yudis
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", 
    "<h4>Portrait of Yudis Rivas</h4> <p>27/08/2024</p><p>Yudis was the first interview/photoshoot that Angie and I did after returning from Cali, Colombia. We met her at her shop in the central part of Medellín. It was only later that I realized how incredible Yudis is. Last month, when I searched her name on YouTube, I discovered she had completed a modeling campaign with Falabella Peru!</p>", 
    `
  <div class="internalflex">
    <img src="images/photoguides/yudis.jpg" alt="Yudis" class="portrait-article">
    <p class="narrativeArticle">Yudis Rivas is an entrepreneur, historian, and stylist based in Medellín. She first gained recognition through her YouTube channel, AfroPowerJY.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton" class="concealed">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);
createMarker(6.24845398262309, -75.55897057056428, racismIconSmall, "yudis", 
"<h4>Yudis Poses Retro Fashion</h4> <p>27/08/2024</p><p>Even though secondhand clothing carries a strong stigma in Latin America, Yudis was one of the first to prove it can be a successful business. Her experience as a stylist supports her ability to select standout pieces. The day after this store opened, I bought 10 jackets to take back to the States with me.</p>", 
`
  <div class="internalflex">
    <img src="images/photoguides/yudis1.jpg" alt="Yudis" class="portrait-article">
    <p class="narrativeArticle">RetroSoul Vintage is a secondhand clothing store located in the La Candelaria district of Medellín, near where many designers create and sell their work. Her venue has become a popular destination for shopping, social gatherings, and community members seeking styling advice.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);
createMarker(6.248637955548493, -75.55916905403137, racismIconSmall, "yudis", 
  "<h4>Portrait of Jhon Córdoba</h4> <p>09/08/2024</p><p>This opening was the first event I photographed in Colombia. I was nervous at first but quickly found my groove photographing the models. After the event, I was invited to a small bar called 'Ubuntu' by some new friends I had made. I remember thinking, 'I think I can do this!'</p>", 
  `
  <div class="internalflex">
    <img src="images/photoguides/yudis2.jpg" alt="Yudis" class="portrait-article">
    <p class="narrativeArticle">The opening of RetroSoul Vintage took place on the evening of August 9th, 2024. Yudis Rivas styled all of the models, and the clothing was curated entirely from secondhand fashion. In this image, model Jhon Córdoba (@jhon_cm) turns heads as he walks.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);
createMarker(6.248547302230998, -75.5593353509903, racismIconSmall, "yudis", 
  "<h4>Portrait of Sabha Isabella</h4> <p>09/08/2024</p><p>Photographing through a language barrier is an interesting dance. Typically, I do my best to explain that a model should strike a different pose with every click of the camera. In an image like this, though, it’s more about being in the right place at the right time to make sure I don’t miss the moment.</p>", 
  `
  <div class="internalflex">
    <img src="images/photoguides/yudis3.jpg" alt="Yudis" class="portrait-article">
    <p class="narrativeArticle">When Yudis started, there were few secondhand clothing markets in Colombia. Now, the competition with other thrift businesses in Medellín is considerable. She uses her social media skills to build an audience of young fashion lovers—one of whom is @sabhaisabella, who also walked in Yudis' opening.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", 
  "<h4>RetroSoul Model Group</h4> <p>09/08/2024</p><p>After the initial catwalk, I had the chance to work with the models individually. The bus they’re leaning on (left) became a recurring element. It turns out someone was sleeping inside, and he was not happy to see the models trying to climb it—oops.</p>", 
  `
  <div class="internalflex">
    <img src="images/photoguides/yudis4.jpg" alt="Yudis" class="landscape-article">
    <p class="narrativeArticle">Medellín is a thriving network of creative directors like Yudis and the models she collaborated with for the opening of her thrift store. Negrofest Models is a major organization that supports Afro-descendant models in the city. They also host an annual Negrofest in Medellín, which takes place in late May.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton" class="concealed">show next</p>
  </div>
`);

//petronio
createMarker(3.412717, -76.553092, racismIconSmall, "petronio", "Petronio Álvarez Crowd Shot", 
  `
  <div class="internalflex">
    <img src="images/photoguides/petroniocrowd.jpg" alt="Petronio crowd" class="landscape-article">

    <p class="narrativeArticle">The Petronio Álvarez Music Festival (or "El Petronio") is an annual event that takes place in Cali, Colombia. Petronio celebrates Afro-Colombian and Pacific music. In 2024, there were over 600,000 attendees.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton" class="concealed">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);
createMarker(3.414529, -76.552792, racismIconSmall, "petronio", 
  "<h4>Elders at Petronio Álvarez</h4> <p>16/08/2024</p><p>I was originally going to title this one 'Viejos (elders) at Petronio,' but it turns out that term is considered disrespectful in Colombian culture. We found this couple while wandering through Petronio. They told us they had been together for over 40 years.</p>", 
  `
  <div class="internalflex">
    <img src="images/photoguides/petronio1.jpg" alt="Petronio Elders" class="portrait-article">

    <p class="narrativeArticle">The Petronio Álvarez Festival is an all-ages event that takes place at Unidad Deportiva Pascualito in the heart of Cali. It’s common for attendees to wear African textile–inspired outfits during the five-day celebration.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);

createMarker(3.411755, -76.553355, racismIconSmall, "petronio", 
  "<h4>Family at Petronio Álvarez</h4> <p>16/08/2024</p><p>This family let us photograph them while they were enjoying the festival. If you look closely, you can spot one of them dancing in the crowd shot image!</p>", 
  `
  <div class="internalflex">
    <img src="images/photoguides/petronio2.jpg" alt="Petronio family" class="portrait-article">
    <p class="narrativeArticle">The Petronio Álvarez Festival took place from August 14–19 in 2024. It’s a celebration of Afro-Pacific music, food, and fashion.</p>
  </div>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>
`);

createMarker(3.410785, -76.550585, racismIconSmall, "petronio", 
  "<h4>Footballers in Cali</h4> <p>18/08/2024</p><p>Angie and I found this scene of soccer players in a field while we were waiting for our ride in Cali. I captured over 20 photographs of these guys in motion, and this is the frame I liked the most. The glare of the light reminds me of an outer planet.</p>", 
  
  `<div class="internalflex">
    <img src="images/photoguides/caliscape1.jpg" alt="Cali football scene" class="landscape-article">
    
    <p class="narrativeArticle">Cali, Colombia is home to the Deportivo Cali football team, one of the most successful in the country. Thanks to its flat terrain and tropical climate, football is played year-round.</p>

    <div id="navbuttons">
      <p id="previousbutton">show previous</p>
      <p id="return">return</p>
      <p id="nextbutton">show next</p>
    </div>
`);

createMarker(3.412599, -76.552867, racismIconSmall, "petronio", 
  "<h4>View from Near Cristo Rey</h4> <p>18/08/2024</p><p>When you visit Cali, find your way to Pizzería La Curva, just beneath the statue of Cristo Rey. After you eat, slip through the fence onto the hill to share the scenic view with the local kite flyers.</p>",

  `<div class="internalflex">
    <img src="images/photoguides/caliscape2.jpg" alt="Cali landscape" class="landscape-article">

    <p class="narrativeArticle">While Cali is mostly flat due to its location in a valley, there are mountains to the west known as the Farallones de Cali. Residents often head to higher elevations to fly kites, a common pastime in Colombia.</p>

    <div id="navbuttons">
      <p id="previousbutton">show previous</p>
      <p id="return">return</p>
      <p id="nextbutton" class="concealed">show next</p>
    </div>
`);


//scenery
createMarker(6.207688382666594, -75.6089183753844, racismIconSmall, "scenery", 
  "<h4>Mirador El Cielo</h4> <p>31/07/2024</p><p>This mirador was about 15 minutes from where I lived in Colombia. I went one morning to catch the sunrise, but the view was obscured by clouds and mountains. Since I arrived so early, the zipline wasn’t open yet—although the cows in the petting zoo were awake and quite conversational.</p>",

  `<div class="internalflex">
    <img src="images/photoguides/mirardorelcielo.jpg" alt="Mirador El Cielo" class="landscape-article">

    <p class="narrativeArticle">Mirador El Cielo (Viewpoint of Heaven) is located in the southern part of the city, in Comuna Belén. It offers a panoramic view of the city, along with a zipline and petting zoo.</p>

    <div id="navbuttons">
      <p id="previousbutton" class="concealed">show previous</p>
      <p id="return">return</p>
      <p id="nextbutton">show next</p>
    </div>`
);
createMarker(6.208756981695937, -75.60742735862733, racismIconSmall, "scenery", 
  "<h4>View from Mirador El Cielo</h4> <p>31/07/2024</p><p>I captured this view on the way down from Mirador El Cielo, showing the city of Medellín framed between two buildings. I originally set out to photograph the sunrise (which meant starting around 5 a.m.), but it was usually too cloudy or mountainous to capture clearly. Still, I kept trying all summer!</p>",

  `<div class="internalflex">
    <img src="images/photoguides/mirardorelcielo2.jpg" alt="Mirador El Cielo" class="portrait-article">

    <p class="narrativeArticle">Medellín is located in the Aburrá Valley, surrounded on both sides by the Andes Mountains. Many of the city’s residents live in elevated areas. This particular viewpoint sits atop a narrow, steep road—perfect for a rigorous hike.</p>

    <div id="navbuttons">
      <p id="previousbutton">show previous</p>
      <p id="return">return</p>
      <p id="nextbutton">show next</p>
    </div>`
);

createMarker(6.189868, -75.547878, racismIconSmall, "scenery", 
  "<h4>View from Segundo Mirador de Las Palmas</h4> <p>11/09/2024</p><p>I visited Las Palmas with Angie to teach her more about long exposure photography at night using a tripod. In addition to cityscapes, we experimented with light painting using the flashlights from our phones. While it was beautiful seeing Medellín at night, I did notice that the light pollution makes stargazing nearly impossible.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/laspalmassegundo.jpg" alt="Las Palmas" class="landscape-article">

  <p class="narrativeArticle">Segundo Mirador de Las Palmas is located near the Poblado neighborhood in the eastern part of the city. It is one of Medellín’s most popular viewpoints, offering an almost full panorama of the Aburrá Valley, where Medellín is located. It's a common spot for dates, outings, and dinners.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.2534204012231225, -75.55541400238435, racismIconSmall, "scenery", 
  "<h4>View from UVA La Imaginación</h4> <p>05/09/2024</p><p>Although I took this image from UVA, most of the actual architecture is behind me. I went to this place with Angie and Jordy after a long day of planning and recording for our podcast. Jordy invited us there, telling us it was a place he enjoys visiting with good friends.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/uvalaimagnicaion.jpg" alt="UVA La Imaginación" class="portrait-article">

  <p class="narrativeArticle">UVA La Imaginación is an architectural project in the central part of Medellín. The initiative aimed to repurpose the area around vital water storage tanks to make it more accessible to the community. The result is a public space that encourages human connection in shared outdoor areas.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton" class="concealed">show next</p>
  </div>`
);
//meetUp
createMarker(6.210266849989744, -75.57091743808796, racismIconSmall, "meetUp", 
  "<h4>Portrait of Luisa Webb</h4> <p>01/09/2024</p><p>Luisa was the only model of the day who spoke English. She was rocking a punk aesthetic and wanted images that screamed 'street fashion.' One of my favorite photos from this session is a funny one of her holding her manager like a baby in her arms.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/@luisawebb.jpg" alt="Luisa" class="portrait-article" >

  <p class="narrativeArticle">On September 1st, we organized an informal meetup between models and photographers. We gathered in Poblado Park, where we used the scenery and nearby graffiti to create images. Luisa Webb is a model who joined to build her portfolio.</p>

  <div id="navbuttons">
    <p id="previousbutton" class="concealed">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.209738244087003, -75.57055234909059, racismIconSmall, "meetUp", 
  "<h4>Portrait of Isabella Torres</h4> <p>01/09/2024</p><p>At the time of this photo, Isabella was 19 years old. She is from El Chocó, located on the northern Pacific coast of Colombia. In 2024, she was crowned Miss Juventud (the equivalent of Miss Teen Universe) of Chocó.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/@isabellatorres.jpg" alt="Isabella" class="portrait-article" >

  <p class="narrativeArticle">On September 1st, we organized an informal meetup between models and photographers. We met in Poblado Park, where we used the scenery and nearby graffiti to create images. Isabella Torres is a model who came to get more photos for her portfolio.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.210127548768135, -75.57122826576234, racismIconSmall, "meetUp", 
  "<h4>Model Meetup Group Photo</h4> <p>01/09/2024</p><p>We organized this model meetup by publicly inviting people to participate via Instagram. At first, we didn’t know how successful it would be, but we ended up gathering around 15 models and photographers. We spent many hours in Poblado Park shooting, and we shared all of the images with the models for free. For some, it was their first time modeling. It was an amazing group experience!</p>",

  `<div class="internalflex">
  <img src="images/photoguides/modelosgroup1.jpg" alt="Model Group" class="landscape-article">

  <p class="narrativeArticle">On September 1st, we organized an informal meetup between models and photographers. We gathered in Poblado Park, where we used the scenery and nearby graffiti to create images. This is a group shot of most of the models who participated.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.210575515442337, -75.57060062885286, racismIconSmall, "meetUp", 
  "<h4>Portrait of Ross Mena</h4> <p>01/09/2024</p><p>Ross joined the meetup later in the day, so we didn’t have much time to collaborate. Still, this is one of my favorite images from the shoot—her pose seems to defy gravity.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/@rossmenaaa.jpg" alt="Ross Mena" class="portrait-article">

  <p class="narrativeArticle">On September 1st, we organized an informal meetup between models and photographers. We gathered in Poblado Park, where we used the scenery and nearby graffiti to create images. Ross Mena is a model who came to get more shots for her portfolio.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.209748909972499, -75.57049334049225, racismIconSmall, "meetUp", 
  "<h4>Portrait of Jeff Kabrera</h4> <p>01/09/2024</p><p>Like Isabella, Jeff is a model from El Chocó. I worked with him extensively throughout the day on both individual and group shots. This image is one of my favorites from the summer. His powerful pose and striking features cut through the frame.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/jeff1.jpg" alt="Jeff" class="portrait-article">

  <p class="narrativeArticle">On September 1st, we organized an informal meetup between models and photographers. We gathered in Poblado Park, where we used the scenery and nearby graffiti to create images. Jeff Kabrera is a model who came to get more shots for his portfolio.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton" class="concealed">show next</p>
  </div>`
);
//musicians
createMarker(6.257155323386246, -75.6021201238498, racismIconSmall, "music", 
  "<h4>Portrait of Ostual Serna Jr.</h4> <p>28/08/2024</p><p>Jordy invited me to this video shoot to interview another artist who was also invited to be there. While I waited for my interviewee to show up, I passed the time by watching the filming of the video and taking some photographs of the artist (I had no idea who he was at the time). Ostual ended up using these photographs for the single cover, as well as for his profile pictures on YouTube, Spotify, and Instagram. As a photographer, this is one of the biggest honors you can achieve!</p>",

  `<div class="internalflex">
  <img src="images/photoguides/ostual1.jpg" alt="Ostual Serna Jr." class="portrait-article" >

  <p class="narrativeArticle">Ostual Serna Jr. is a musician originally from Quibdó, Chocó. He is the son of Ostual Serna of Grupo Niche, a famous salsa band that has been active in Colombia since 1978. This photo was taken during the filming of his music video "Si Te Vuelvo a Amar."</p>

  <div id="navbuttons">
    <p id="previousbutton" class="concealed">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.207945000694544, -75.56795228243543, racismIconSmall, "music", 
  "<h4>Portrait of Johan Florez</h4> <p>14/09/2024</p><p>I photographed Johan at an event called La Koncha, which my friends hosted as an international music festival. This took place in a club called 'Purple Reign' in Poblado. Johan's set was magnetic as he captured the audience's attention with a trumpet, drum, and piano combo.</p>",

  `<div class="internalflex">
  <img src="images/photoguides/musician1.jpg" alt="Johan Florez" class="portrait-article" >

  <p class="narrativeArticle">Johan Florez is a trumpeter, producer, and composer from Quibdó, Chocó.</p>

  <div id="navbuttons">
    <p id="previousbutton">show previous</p>
    <p id="return">return</p>
    <p id="nextbutton">show next</p>
  </div>`
);

createMarker(6.214468598450958, -75.60353227530427, racismIconSmall, "music", "<h4>Portrait of Katharsis de la Soul</h4> <p>09/08/2024</p><p>Katharsis came to Angie’s house in Belén for a photoshoot and interview. We went outside to the parking lot and found this car that complemented his outfit. He used one of the pictures that Angie took of him for his Spotify header and avatar. It was a great boost to her confidence to see her photos used publicly in this way.</p>",
    
`<div class="internalflex">
<img src="images/photoguides/katharsis.jpg" alt="Katharsis de la Soul" class="portrait-article" >

<p class="narrativeArticle">Katharsis de la Soul is a hip-hop artist based in Medellín. His influences include artists such as Tupac, Doble Porción, and Granuja Casa. His name is a reference to his desire to liberate himself through music.</p>

<div id="navbuttons">
  <p id="previousbutton">show previous</p>
  <p id="return">return</p>
  <p id="nextbutton" class="concealed">show next</p>
</div>`
);

 
// Function to show overlay based on marker class
function showOverlay(markerClass, subheading) {
    
    //showing overlay and navigation bars
    overlay.style.display = 'flex';
    menu.style.display="flex";
    currentClass = markerClass;

    //find marker by popup content
    const marker = markersByClass[markerClass].find(marker => marker.getPopup().getContent() === subheading);
    currentIndex = markersByClass[markerClass].indexOf(marker);
    
    //accesses stored body content
    const bodyContent = marker?.bodyContent || "";

    let title = "";
    let content = "";
    let backgroundColor = ""

    // Change content based on class
    
    if (markerClass === "racism") {
        title = "Racism Experience",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you experienced racism.”`,
         overlay.style.background= "linear-gradient(90deg,rgb(145, 145, 145) 0%,rgb(0, 0, 0, .5) 20%,rgba(145, 145, 145, 0.2) 70%)",
        overlayTitle.style.color= "rgb(255, 255, 255)";

    } else if (markerClass === "romance") {
        title= "Romance Experience",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place in which you had a romantic experience.”`,
        overlayTitle.style.color=" #701563",
        overlay.style.background= "linear-gradient(90deg, #f5c9ef 0%, #f5c9ef 40%,rgba(245, 201, 239, 0.2) 70%)"
    
    } else if (markerClass === "hiking") {
        title= "hiking Experience",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
        

    } else if (markerClass === "yudis") {
        title= "Meet Yudis Rivas",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
    } else if (markerClass === "petronio") {
        title= "Petronio Alvarez Music Festival",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
    }

    else if (markerClass === "scenery") {
        title= "Beautiful Scenery",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
    }

    else if (markerClass === "meetUp") {
        title= "Model MeetUp",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
    }

    else if (markerClass === "music") {
        title= "Musicians to Know",
        content = `To document authentic experiences amongst people of the African Diaspora, BlueBook Magazine interviews locals, travelers, and immigrants to learn more about their varied experiences as they travel throughout the world. The following responses are in response to the question “talk about a place where you like to take a walk.”`,
        overlayTitle.style.color= " #733011",
        overlay.style.background = "linear-gradient(90deg,rgb(239, 177, 148) 0%,rgb(239, 177, 148) 30%,rgba(239, 177, 148, 0.2) 65%)"
    }

    


    // overlayTitle.innerText = title;
    overlaySubheading.innerText= `"${title}"`;
    overlayContent.innerHTML = bodyContent;
    // overlay.style.background = backgroundColor;
}

//function for going to the next marker in class

document.addEventListener("click", function(e){
    if (e.target && e.target.id === "nextbutton"){
    if (!markersByClass[currentClass] || markersByClass[currentClass].length===0) return;

    //closes popup of current marker
    if (currentMarker){
        currentMarker.closePopup();
    }


    currentIndex = (currentIndex + 1) % markersByClass[currentClass].length;

    //get new marker
    currentMarker = markersByClass[currentClass][currentIndex];
    const nextPopupText = currentMarker.getPopup().getContent();

    //use setTimeOut for animation
    setTimeout(() => {
        currentMarker.openPopup(); //open the new marker popup with animation
    }, 300);

    currentMarker.openPopup();

    showOverlay(currentClass, nextPopupText);

//offseting the markers lightly so that the popup doesn't intersect with overlay
    let markerLatLng = currentMarker.getLatLng();
    let offsetLatLng = L.latLng(markerLatLng.lat, markerLatLng.lng - .0015); 
    map.flyTo(offsetLatLng, 17, {
        animate: true,
        duration: .75
    });
}
});


document.addEventListener("click", function(e){
    if (e.target && e.target.id === "previousbutton"){
    if (!markersByClass[currentClass] || markersByClass[currentClass].length===0) return;

    //closes popup of current marker
    if (currentMarker){
        currentMarker.closePopup();
    }


    currentIndex = (currentIndex - 1) % markersByClass[currentClass].length;

    //get new marker
    currentMarker = markersByClass[currentClass][currentIndex];
    const nextPopupText = currentMarker.getPopup().getContent();

    //use setTimeOut for animation
    setTimeout(() => {
        currentMarker.openPopup(); //open the new marker popup with animation
    }, 300);

    currentMarker.openPopup();

    showOverlay(currentClass, nextPopupText);

//offseting the markers lightly so that the popup doesn't intersect with overlay
    let markerLatLng = currentMarker.getLatLng();
    let offsetLatLng = L.latLng(markerLatLng.lat, markerLatLng.lng - .0015); 
    map.flyTo(offsetLatLng, 17, {
        animate: true,
        duration: .75
    });
}
});


document.querySelectorAll(".filter").forEach(item => {
    item.addEventListener('click', function (){
        const type = this.getAttribute('data-type');
        toggleMarkers(type);
    });
});

tabs.forEach(tab => {
    tab.addEventListener("click", function () {

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove("active"));

        // Add active class to the clicked tab
        this.classList.add("active");

        // Get content type from data-content attribute
        const contentType = this.getAttribute("data-content");

        // Update overlay content
        overlayTitle.textContent = contentData[contentType].title;
        overlayContent.innerHTML = contentData[contentType].content;
        overlaySubheading.innerHTML = contentData[contentType].title;
        overlay.style.background = contentData[contentType].backgroundColor;


        console.log(contentData[contentType].backgroundColor);
        // overlay.style.background = "blue";
        // console.log(overlay.style.background);
    });
});


//function for adding interactivity when clicking on images
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("photo-thumbnail")) {
        const markerClass = e.target.dataset.markerClass;
        const markerIndex = parseInt(e.target.dataset.markerIndex, 10);

        if (markerClass && markersByClass[markerClass] && markersByClass[markerClass][markerIndex]) {
            const marker = markersByClass[markerClass][markerIndex];
            marker.fire('click');
        }
    }
});

//function for start button to enter experiencce

start.addEventListener("click", function(){
    intro.classList.add("hidden");
    topbar.classList.remove("hidden");
    mapdiv.classList.remove("hidden");
    resetdiv.classList.remove("hidden");
    mainTitle.classList.add("hidden");
    mainTitle.style.display = "none";

     // Open the overlay and photo tab
    // overlay.classList.remove("hidden");
    overlay.style.display = "flex";
    menu.classList.remove("hidden");
    overlayIMG.classList.remove("hidden");
    redX.classList.remove("hidden");

     // Activate the "photos" tab
    const photoTab = document.querySelector('[data-content="photos"]');

    if (photoTab) {
        tabs.forEach(t => t.classList.remove("active"));
        photoTab.classList.add("active");

        const photoContent = contentData["photos"];
        overlayTitle.textContent = photoContent.title;
        overlayContent.innerHTML = photoContent.content;
        overlaySubheading.innerHTML = `"${photoContent.title}"`;
        overlay.style.background = photoContent.backgroundColor;
    }

    setTimeout(() => {
        map.invalidateSize(); // Important!
    }, 100); // slight delay ensures DOM update before resize
})

//function for resetting experience

function reset(){
    overlay.classList.add("hidden");
    overlay.style.display = "none";
    menu.classList.add("hidden");
    redX.classList.add("hidden");
    overlayIMG.classList.remove("hidden");

    overlayContent.innerHTML = "";
    overlayTitle.textContent = "";
    overlaySubheading.textContent = "";
    mainTitle.classList.remove("hidden");

    topbar.classList.add("hidden");
    intro.classList.remove("hidden");
    mapdiv.classList.add("hidden");
    resetdiv.classList.add("hidden");
    
    if (currentMarker){
        currentMarker.closePopup();
    }

    currentClass = "";
    currentIndex = 0;
    currentMarker = null;
    
    // Reset map view
    map.setView([6.298061666390256, -75.5852508544922], 5);
    }

    //functioning for returning to photoview

    function returnPhotos(){
        intro.classList.add("hidden");
    topbar.classList.remove("hidden");
    mapdiv.classList.remove("hidden");
    resetdiv.classList.remove("hidden");
    mainTitle.classList.add("hidden");
    mainTitle.style.display = "none";

     // Open the overlay and photo tab
    // overlay.classList.remove("hidden");
    overlay.style.display = "flex";
    menu.classList.remove("hidden");
    overlayIMG.classList.remove("hidden");
    redX.classList.remove("hidden");

     // Activate the "photos" tab
    const photoTab = document.querySelector('[data-content="photos"]');

    if (photoTab) {
        tabs.forEach(t => t.classList.remove("active"));
        photoTab.classList.add("active");

        const photoContent = contentData["photos"];
        overlayTitle.textContent = photoContent.title;
        overlayContent.innerHTML = photoContent.content;
        overlaySubheading.innerHTML = `"${photoContent.title}"`;
        overlay.style.background = photoContent.backgroundColor;
    }

    setTimeout(() => {
        map.invalidateSize(); // Important!
    }, 100); // slight delay ensures DOM update before resize
    }

    document.addEventListener("click", function(e){
    if (e.target && e.target.id === "return"){
       intro.classList.add("hidden");
    topbar.classList.remove("hidden");
    mapdiv.classList.remove("hidden");
    resetdiv.classList.remove("hidden");
    mainTitle.classList.add("hidden");
    mainTitle.style.display = "none";

     // Open the overlay and photo tab
    // overlay.classList.remove("hidden");
    overlay.style.display = "flex";
    menu.classList.remove("hidden");
    overlayIMG.classList.remove("hidden");
    redX.classList.remove("hidden");

     if (currentMarker){
        currentMarker.closePopup();
    }

    currentClass = "";
    currentIndex = 0;
    currentMarker = null;

     // Activate the "photos" tab
    const photoTab = document.querySelector('[data-content="photos"]');

    if (photoTab) {
        tabs.forEach(t => t.classList.remove("active"));
        photoTab.classList.add("active");

        const photoContent = contentData["photos"];
        overlayTitle.textContent = photoContent.title;
        overlayContent.innerHTML = photoContent.content;
        overlaySubheading.innerHTML = `"${photoContent.title}"`;
        overlay.style.background = photoContent.backgroundColor;
    }

    setTimeout(() => {
        map.invalidateSize(); // Important!
    }, 100); // slight delay ensures DOM update before resize
    }});

    //reset button actually resets

    resetbutton.addEventListener("click", reset);

    

    //timer and resetting
    function resetTimer(){
        clearTimeout(timer);
        // timer = setTimeout(() => {
        //     reset();}, timeoutTime);
        // }

        timer = setTimeout(reset, timeoutTime);
}
        events.forEach(event => {
            window.addEventListener(event, resetTimer, true)
        });

        resetTimer();
    

})();