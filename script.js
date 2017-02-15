window.addEventListener("load",function(event){
	const APPID = '2d3055ddb7941ccc16f48f3aaeb29121'
	let go = document.getElementById("go");
    let putMarkOnMap = function(event){
    	//event.preventDefault();
    	let marker;
    	let inputValue = document.getElementsByTagName("input")[0].value;
    	var geocoder = new google.maps.Geocoder();

    	let f =  function(results) {
    		map.setCenter(results[0].geometry.location);
        	map.fitBounds(results[0].geometry.bounds);//automatically set level

        	// put marker on map
        	marker = new google.maps.Marker({
        		map: map,
        		position: results[0].geometry.location
        	});
    	}
    	geocoder.geocode({"address": inputValue},f);
       // show weather info
    	let req = new XMLHttpRequest();
    	let url = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APPID}`;
    	req.open("get",url)
    	req.onreadystatechange = function(event) {
      		if( req.status == 200 && req.readyState == 4){
        		let res = JSON.parse(req.responseText);
        		console.log(req.responseText)
        
        		let data = `weather: ${res.weather[0].main}, 
        		description: ${res.weather[0].description}, 
        		temperature: ${res.main.temp},
        		wind speed: ${res.wind.speed}, 
        		cloud: ${res.clouds.all}`;
        		document.getElementById('weather-container').innerHTML = data;
   			}
 		}
		req.send();
  	}
  	go.addEventListener("click",putMarkOnMap);
  	
   
});