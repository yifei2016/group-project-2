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
    //project1Explore.style.top='86px';
    project1Explore.style.backgroundImage='none'

};

req.send();
    

//console.log('Du sökte: '+ locationvalue.value)
        
        

}

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
        //project1Map.style.top='86px'
        project1Map.style.backgroundImage='none'
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
       project1Weather.style.backgroundImage='none'

        
      }
    };
    
    
    req.open('GET',`http://api.openweathermap.org/data/2.5/weather?q=${locationvalue.value}&APPID=2d3055ddb7941ccc16f48f3aaeb29121`) //es 6
    //req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&APPID=2d3055ddb7941ccc16f48f3aaeb29121');
    req.send();
    
    //project1Weather.style.top='86px';
} 

//-----------------FUNCTION GET WEATHER ENDS------------------


//-------------THESE ARE THE DIVS IN WHICH TO DISPLAY THE API RESPONSES, SHOULD BE SWITCHED TO THE DIVS USED IN THE HTML & CSS TEMPLATE---//
let project1Map = document.getElementById('map');
let project1Explore = document.getElementById('explore');
let project1Weather = document.getElementById('weather');

let contentarray = [];
contentarray.push(project1Map, project1Explore, project1Weather)


/*
function resetIDs() {
        project1Map.id = 'map'
        project1Explore.id = 'explore'
        project1Weather.id = 'weather'
};


for(i=0; i<=2; i++){
    let index = i
    contentarray[i].addEventListener('click', function(){
        console.log(contentarray[index])
         resetIDs();
         contentarray[index].id = 'centered';
    });
    
    
}

*/
    
//---------------------------------------------------------------------------------------------------------------------------//

    let searchbtn = document.getElementById("btn");
    
    let locationvalue = document.getElementById('locationvalue');
    
    function runSearch(){
        getExplore();
        getPlaceOnMap();
        getWeather();
    };
    
locationvalue.addEventListener('keydown', function(key){
    if(event.keyCode==13){
      runSearch();
       }
});
    
    searchbtn.addEventListener('click', function(){
       runSearch();
        
});



function Slide(){
    
    let rightstringarray = ['Explore', 'Weather', ''];
    let leftstringarray = ['', 'Map', 'Explore'];
    
    let leftvalue = -61;
    let leftvaluearray = [];
    
    for(i=0;i<contentarray.length; i++){
    
    leftvalue += 66
    leftvaluearray.push(leftvalue)
    
    newleftvalue = leftvalue.toString() + 'vw'
    
    contentarray[i].className='col-xs-4'
    contentarray[i].style.position = 'absolute'
    contentarray[i].style.top = '4vh'
    contentarray[i].style.outline='3.5px solid #b9beb8'
    contentarray[i].style.height = '85%'
    contentarray[i].style.width = '60vw'
    contentarray[i].style.padding = '0 0'
    contentarray[i].style.backgroundSize = "50%"
    contentarray[i].style.opacity='1'
    contentarray[i].style.left=newleftvalue
    contentarray[i].style.transition='1.5s ease'
    contentarray[i].style.float='left'
    contentarray[i].style.border='2px solid white'
    };
    
        let leftarrow = document.getElementById('leftarrow')
    
        let rightarrow = document.getElementById('rightarrow')
        
        let textclockwise = document.getElementsByClassName('rotateclockwise')[0]
        let textcounterclockwise = document.getElementsByClassName('rotatecounterclockwise')[0]
              function arrowInnerHTML(){
                  
        textcounterclockwise.innerHTML = leftstringarray[rightclicks]
        textclockwise.innerHTML = rightstringarray[rightclicks]
        
            }
       
        let leftclicks = 0;
        let rightclicks = 0;
        
        leftarrow.addEventListener('click', function(){
        
            
      
             
        var leftvalue1 = 0
        const sixtysix=66;
        
        if(rightclicks>0 && leftclicks<4){
            
            leftclicks++
            rightclicks--
            
            for(i=0;i<contentarray.length; i++){
               
                for(i=0;i<leftvaluearray.length;i++){
                    leftvaluearray[i]+=sixtysix

                    leftvalue1 = leftvaluearray[i]
                let newleftvalue1 = leftvalue1.toString() + 'vw'

                contentarray[i].style.left=newleftvalue1
                };
                

            };
        };
            console.log('Det här är rightclicks: ' + rightclicks + ' Det här är leftclicks: ' + leftclicks)
            arrowInnerHTML();
    });
    
     

    
    rightarrow.addEventListener('click', function(){
        
         var leftvalue1 = 0
               
         if(leftclicks<=2 && rightclicks<2){
         rightclicks++
         
         if(leftclicks !== 0){
         leftclicks-- 
         };
         if(leftclicks<=3 && rightclicks<=2){
            for(i=0;i<contentarray.length; i++){
               
                for(i=0;i<leftvaluearray.length;i++){
                    leftvaluearray[i]-=66

                    leftvalue1 = leftvaluearray[i]
                let newleftvalue1 = leftvalue1.toString() + 'vw'

                contentarray[i].style.left=newleftvalue1
                };


                

            };
         };
        };
   

        
        console.log('Det här är rightclicks: ' + rightclicks + ' Det här är leftclicks: ' + leftclicks)
        arrowInnerHTML();
        
    });
        
       

}
    
    Slide()



