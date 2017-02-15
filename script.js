window.addEventListener("load",function(event){
	let go = document.getElementById("go");
	var marker;
  let putMarkOnMap = function(event){
    //event.preventDefault();
    
    let inputValue = document.getElementsByTagName("input")[0].value;
    var geocoder = new google.maps.Geocoder();

    let f =  function(results) {
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.bounds);//automatically set level
        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
    }
    geocoder.geocode({"address": inputValue},f);
  }
  go.addEventListener("click",putMarkOnMap);
  go.addEventListener("click",function(event){
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
      if( req.readyState == 4 ){
        let res = JSON.parse(req.responseText);
        console.log(req.responseText)
        
        let data = `<h5 style=color:green;>${inputValue} weather:</h5><p style="color:red;">${res.name},${res.weather[0].description},wind speed: ${res.wind.speed}</p>`;
        //let data = "<h5 style=color:green;>"+inputValue
        let div = document.createElement('div');

   }
 }
});