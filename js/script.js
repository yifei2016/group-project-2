window.addEventListener("load",function(event){
    let go = document.getElementById("go");
    // go.addEventListener('click',function(){
    //      $('#myModal').modal('toggle');
       
    // });
    go.addEventListener("click",putMarkOnMap);
});

const APPID = '2d3055ddb7941ccc16f48f3aaeb29121'

function putMarkOnMap(event){
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
             let icon = res.weather[0].icon;
        
        // let iconsrc = 'url(http://openweathermap.org/img/w/' + iconpath;
        let iconsrc = `http://openweathermap.org/img/w/${icon}.png`;
        // weathericon.src=iconsrc;
            let data = `<div><h5 style="color:green;">${locationvalue.value} weather:</h5><p style="color:red;">${res.weather[0].main}, description: ${res.weather[0].description}, 
        wind speed: ${res.wind.speed}, temperature: ${res.main.temp} °C <img src=${iconsrc}></p></div>`;
            let weather = document.getElementById("weather");
            weather.innerHTML = data;
        }

    }
    
    req.send();
}