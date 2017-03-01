window.onload=function(){
    setTimeout(function(){
        locationvalue.focus()
    }, 100)
};


//------------------------------------------FUNCTION GET EXPLORE TEXT-------------------------------------------------------------------------------
    function getExplore(){
        
    
    let req = new XMLHttpRequest
    
        let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + locationvalue.value + "&format=json&origin=*";
    
        req.open('GET', url);
    
req.onreadystatechange = function(event) {

	if( req.readyState == 4 )
console.log('- success!');
	console.log("-----");
    let myPlaceParsed = JSON.parse(req.responseText)
  let displayedtext= '';
    
        
       displayedtext+= myPlaceParsed[2] + '<br>'+'<br>'

    //console.log(myPlaceParsed);
    project1Explore.innerHTML = displayedtext
    project1Explore.style.top='86px';

};

req.send();
    

//console.log('Du sökte: '+ locationvalue.value)
        
        

}

//-------------------- jQuery-------------------------------------------------------------------------------------------------------
jQuery(function () 
 {
	 jQuery("#locationvalue").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#f_elem_city").val(selectedObj.value);
		getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 jQuery("#f_elem_city").autocomplete("option", "delay", 100);
	});



//-----------------------------------------------------------FUNCTION GET PLACE ON MAP----------------------------------------------------------
function getPlaceOnMap(){
    console.log(locationvalue.value + 'här')
        let lat;
        let lng;
          var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': locationvalue.value}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
             let lat = results[0].geometry.location.lat() 
             let lng = results[0].geometry.location.lng();
             
              console.log('Detta är latitude och longitud: ' + lat, lng)
              
                                     function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    
        var marker = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map
        });
      }
        
        myMap()
        project1Map.style.top='86px'
          }
        
        if(location.value.length===0){
           alert("Please type a location.")
        }

        else {
            alert("Something went wrong " + status);
          }
        });
        

};
           

//-----------------------------------------------------FUNCTION GET WEATHER--------------------------------------------------------------------------
function getWeather(){
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
      if( req.readyState == 4 ){
        let res = JSON.parse(req.responseText);
        console.log(req.responseText)
        
        let data = `<h5 style=color:green;>${locationvalue.value} weather:</h5><p style="color:red;">${res.name},${res.weather[0].description},wind speed: ${res.wind.speed}</p>`;
        //let data = "<h5 style=color:green;>"+inputValue
        
       project1Weather.innerHTML = data;

        
      }
    };
    
    
    req.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${locationvalue.value}&APPID=2d3055ddb7941ccc16f48f3aaeb29121`) //es 6
    //req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&APPID=2d3055ddb7941ccc16f48f3aaeb29121');
    req.send();
    
    project1Weather.style.top='86px';
} 

//-----------------FUNCTION GET WEATHER ENDS------------------


//-------------THESE ARE THE DIVS IN WHICH TO DISPLAY THE API RESPONSES, SHOULD BE SWITCHED TO THE DIVS USED IN THE HTML & CSS TEMPLATE---//
let project1Map = document.getElementById('map')
let project1Explore = document.getElementById('explore')
let project1Weather = document.getElementById('weather')
//---------------------------------------------------------------------------------------------------------------------------//

    let searchbtn = document.getElementById("btn")
    
    let locationvalue = document.getElementById('locationvalue')
    
    function runSearch(){
        getExplore();
        getPlaceOnMap();
        getWeather();
    }
    
locationvalue.addEventListener('keydown', function(key){
    if(event.keyCode==13){
      runSearch();
       }
});
    
    searchbtn.addEventListener('click', function(){
       runSearch();
        
});

