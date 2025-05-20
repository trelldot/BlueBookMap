(function(){

'use strict'
console.log("Reading JS");



let overlay = document.getElementById("overlay");
const overlayTitle = document.querySelector("#overlay-title");
const overlayContent = document.querySelector("#overlay-content");
const overlaySubheading = document.querySelector("#overlay-subheading");
const topbar = document.querySelector("#topBar");
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
    } else {
        overlay.style.display = "none";
        overlayIMG.src = "images/menu.png";
        menu.style.display="none";
    }

    if (window.innerWidth < 600){
        topbar.style.display="none";
    }
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
        topbar.style.display="flex";
    }
    });

document.addEventListener('keydown', function(event){
    if (event.key === "Escape"){
        document.getElementById("overlay").style.display = "none";
        mainTitle.style.display="block";
    }

    if (window.innerWidth < 600){
        topbar.style.display="flex";
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
        const offsetLatLng = L.latLng(markerLatLng.lat -.00009, markerLatLng.lng - 0.0009);

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
createMarker(6.191615, -75.547647, romanceIconSmall, "romance", "The Las Palmas viewpoint with hot chocolate. Viewpoints are very romantic.");
createMarker(6.232912404724993, -75.60416579246521, romanceIconSmall, "romance", "The Los Molinos Cinema. It was actually my first romantic experience because it was with my first boyfriend. We were both from Quibdó and visited Medellín during Holy Week. I was 13 years old. ");
createMarker(6.236046744209422, -75.5802050727515, romanceIconSmall,"romance", "I had a romantic experience at Pueblito Paisa. It’s a very beautiful viewpoint to go with your partner or friends.");
createMarker(6.245775705249648, -75.59561501436937, romanceIconSmall, "romance", "Laureles. It's my really well-known romantic place, my first date. in fact, when I came to Medellín, my first date was at a Starbucks in Laureles.");
createMarker(6.2306263965333155, -75.61134874820709, romanceIconSmall, "romance", "The University of Medellín. That’s where I met my boyfriend, so it’s a place that reminds me of how we met.");

//hiking

createMarker(6.252693, -75.564734, hikeIconSmall, "hiking", "There’s a spot I think is the best right now: the first Saturday of every month at San Alejo. Visiting the San Alejo Fair at Bolívar Park is amazing. It’s a local crafts fair with handmade goods and trinkets.");
createMarker(6.268126, -75.566075, hikeIconSmall, "hiking", "I really like Laureles for taking a walk because of its peaceful parks. I also like the Parque de los Deseos, which is great for relaxing for a while.");
createMarker(6.209317, -75.498096, hikeIconSmall, "hiking", "Santa Elena. The rivers and so many places around it, but Santa Elena is truly magical. It’s very beautiful and feels like my peaceful escape.");
createMarker(6.209882, -75.497013, hikeIconSmall, "hiking", "Santa Elena is a beautiful place to spend some quality time.");

//racism
createMarker(6.212760, -75.577929, racismIconSmall, "racism", "On the metro, on the metro, it’s the daily bread for Black people.");
createMarker(6.252651188861533, -75.56458711624147, racismIconSmall, "racism", "On the metro station.");
createMarker(6.252651188861533, -75.56458711624147, racismIconSmall, "racism", "Downtown Medellín.");
createMarker(6.231548739241308, -75.61130583286287, racismIconSmall, "racism", "At school. They always made comments about my hair, and I was the only Black girl in the class, so you can imagine how it was. ");
createMarker(6.231470970357367, -75.60997009277345, racismIconSmall, "racism", "It’s a fine line, but I’d say at the university. There was a security guard who always called me “Negra Esmeralda.” While it may not be the most blatantly racist act, the issue was that he didn’t address anyone else in that way.");

//Yudis
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", "1", `
  
  <img src="images/photoguides/yudis.jpg" alt="Yudis" class="portrait-article"  >
  <p class="narrativeArticle">Yudis Rivas is an entrpreneur, historian, and stylist based in Medellin. She first became known through her YouTube channel AfroPowerJY. As a university student during Covid 19, Yudis started designing custom t-shirts. These designs became popular enough to gain traction as an online store, and RetroSoul Vintage was born. </p>

                 <div id="navbuttons">
                    
                    <p id="return">return to photos</p>
                    <p id="nextbutton">show next</p>
                </div>

  `, );
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", "2", `
  
  <img src="images/photoguides/yudis1.jpg" alt="Yudis" class="portrait-article"  >
  <p class="narrativeArticle">RetroSoul Vintage is a second hand clothing store. While second hand clothing has a stigma in Latin America, Yudis was able to generate enough commerce to open up a physical location in La Calenderia district in Medellin, close to where many designers make and sell work. Her venue is a popular location for shopping, social gatherings, and for community members to recieve styling advice.  </p>

                 <div id="navbuttons">
                    <p id="previousbutton">show previous</p>
                    <p id="return">return to photos</p>
                    <p id="nextbutton">show next</p>
                </div>

  `);
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", "3", `
  
  <img src="images/photoguides/yudis2.jpg" alt="Yudis" class="portrait-article"  >
  <p class="narrativeArticle">The opening of the physical locaton of RetroSoul Vintage took place on the evening of August 9th, 2024. Guests were treated to refreshment, live music, and a fashion show. Yudis was the stylist for all of the models present, and the clothing was all compiled from second hand fashion. In this image, model Jhon Cordoba (@jhon_cm) turns heads as he walks. </p>

                 <div id="navbuttons">
                    <p id="previousbutton">show previous</p>
                    <p id="return">return to photos</p>
                    <p id="nextbutton">show next</p>
                </div>

  `);
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", "4", `
  
  <img src="images/photoguides/yudis3.jpg" alt="Yudis" class="portrait-article"  >
  <p class="narrativeArticle">When Yudis first started, there were very few second hand clothing markets in Colombia. Now that the concept is more popular, she faced competition from others with more business oriented backgrounds. She used her social media skills to her advantage, building up an audience of young fashion lovers. one of which is @sabhaisabella, who also walked in Yudis' opening. </p>

                 <div id="navbuttons">
                    <p id="previousbutton">show previous</p>
                    <p id="return">return to photos</p>
                    <p id="nextbutton">show next</p>
                </div>

  `);
createMarker(6.248155177208103, -75.55903369656583, racismIconSmall, "yudis", "5",`
  
  <img src="images/photoguides/yudis4.jpg" alt="Yudis" class="landscape-article"  >
  <p class="narrativeArticle"> RetroSoul is just the beingging. From Here Yudis plans to open more locations and enter the fashion worl in a more professional capacity. </p>

                 <div id="navbuttons">
                    <p id="previousbutton">show previous</p>
                    <p id="return">return to photos</p>
                   
                </div>

  `);

//petronio
createMarker(3.412717, -76.553092, racismIconSmall, "petronio", "1", "Petronio Alvarez is an annual festical that takes place in Cali Colombia. It is an afro-colombian music festival.");

createMarker(3.414529, -76.552792, racismIconSmall, "petronio", "2", "Petronio Alvarez is an annual festical that takes place in Cali Colombia. It is an afro-colombian music festival.");

createMarker(3.411755, -76.553355, racismIconSmall, "petronio", "3", "Petronio Alvarez is an annual festical that takes place in Cali Colombia. It is an afro-colombian music festival.");

createMarker(3.410785, -76.550585, racismIconSmall, "petronio", "4", "Petronio Alvarez is an annual festical that takes place in Cali Colombia. It is an afro-colombian music festival.");

createMarker(3.412599, -76.552867, racismIconSmall, "petronio", "5", "Petronio Alvarez is an annual festical that takes place in Cali Colombia. It is an afro-colombian music festival.");

//scenery


//meetUp


//musicians


 
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
    let offsetLatLng = L.latLng(markerLatLng.lat, markerLatLng.lng - .00009); 
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

})();