let input = document.querySelector("input");
let iframe = document.querySelector("iframe");
let Points = document.querySelector(".inf-window__points");
let mapOnce = document.querySelector(".inf-map");
let count = 0;
let objects = [];
let result = null;
let arrPoly = [];
let myPolyline = null;
document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;
	if (e.keyCode == '13' && input.value != "") {
	  	let newPoint = document.createElement("div");
	  	newPoint.style.display = "flex";
	  	newPoint.className = "inf-window__point-wrapper";
	  	let newPointText = document.createElement("p");
	  	newPointText.className = "inf-window__text";
	  	let newPointTextValue = document.createTextNode(input.value);
	  	newPointText.appendChild(newPointTextValue);
	  	newPoint.appendChild(newPointText);
	  	let newPointDelete = document.createElement("img");
	  	newPointDelete.addEventListener("click", deleteText);
	  	newPointDelete.className = "inf-window__point-close";
	  	newPointDelete.src = "../img/index/cross.png";
	  	newPoint.appendChild(newPointDelete);
	  	Points.appendChild(newPoint);
	  	createMarker();
	}
}

function deleteText(e){
	let curPointClose = document.querySelectorAll(".inf-window__point-close");
	for(let i=0; i<curPointClose.length; i++){
		if (curPointClose[i] == e.target) {
            myMap.geoObjects.remove(objects[i]);
            myMap.geoObjects.remove(myPolyline);
            count--;
            if (count == 0) {
                for (let j=0; j<objects.length; j++){
                    myMap.geoObjects.remove(objects[j]);
                }
                objects = [];
            }
            if (arrPoly.length != 2 && arrPoly.length != 1) {
                arrPoly.splice(i, 1);
                createPoly();
            }
		}
	}
	e.target.parentNode.style.display = "none";
}


ymaps.ready(init);
      var myMap;
function init () { 
		myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

}

function createMarker(){
	objects[count] = new ymaps.Placemark(myMap.getCenter(), {
        balloonContent: '<strong>'+input.value+'</strong>'
    }, {
        preset: 'islands#blackStretchyIcon',
        draggable: false  //Нет смысла не могу перетащить маршрут
    });
    arrPoly[count] = myMap.getCenter();
    createPoly();
    myMap.geoObjects.add(objects[count]);
    count++;     
}

function createPoly(){
    if (count != 0) {
        myMap.geoObjects.remove(myPolyline);
        myPolyline = new ymaps.Polyline(arrPoly, {
            balloonContent: "Маршрут"
            }, {
            strokeColor: "#000000",
            draggable: true,
            strokeWidth: 4,
            strokeOpacity: 0.5
        });     
    myMap.geoObjects.add(myPolyline);
    }
}


