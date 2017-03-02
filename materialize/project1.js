window.onload=function(){
    setTimeout(function(){
        locationvalue.focus()
    }, 100)
};

let locationvalue = document.getElementById('locationvalue');
let inputDiv = document.getElementsByClassName('inputdiv')[0]
let removeadd = document.getElementById('removeadd')
let leftarrow = document.getElementById('leftarrow')
let rightarrow = document.getElementById('rightarrow')
let favourite = document.getElementById('favourite')
let favourites = document.getElementById('favourites');
let alternativechosen = false;
let searchedonce;




function divsPositioned(){
    removeadd.className='removeaddpositioned'
    inputDiv.className='inputdivpositioned inputdiv';
    rightarrow.className='rightarrow rightarrowpositioned'
    leftarrow.className='leftarrow leftarrowpositioned'
    removeadd.id='removeaddpositioned'
    favourite.style.right='25vw';
    
    for(i=0;i>0&&i<contentarray.length;i++){
        contentarray[i].style.display='none';
    };
    
    setTimeout(function(){
        removeadd.style.overflow= 'hidden';
    }, 1500)
    
}


//-------------------- jQuery-------------------------------------------------------------------------------------------------------
jQuery(function () 
 {
    
    if(locationvalue.value.length>19){
        
        locationvalue.style.fontSize='0.5vw';
    }
    
    if(locationvalue.value.length<19){
        
        locationvalue.style.fontSize='3vw';
    }
    
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
		//jQuery("getcitydetails").val(selectedObj.value);
            console.log('select ?');
            
             alternativechosen = true;
        console.log("alternativechosen: " + alternativechosen)
        searchbtn.disabled=false;
            $('#locationvalue').val(selectedObj.value);
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


//error regarding the when you click on search text button, it dosen't select the city you need to do it with arrows on keyboard.

$(document).ready(function(){
    console.log('document reqdy');
     ;
    /*$("#locationvalue").on('change', function(){
        console.log('locationvlue change');
    });*/
    $("#locationvalue").click(function(){
        console.log('ui corner all - click')
        $(this).select();
       
       
    });
    console.log('document reqdy');
});


//-------------------------HOW IT WORKS-----------------------------------


window.onload = function() {

  console.log("dfsdf")
  let ask = document.getElementById("ask");
  let center = document.getElementsByClassName("center")[0];

  ask.addEventListener("click", function() {

    let answer = document.getElementsByClassName("answer")[0];
    // answer.style.top = "0px";
    center.style.left = "-1.5vw";
      center.style.backgroundColor='#465645'
    
   
  })
  let close = document.getElementById("close");
   close.addEventListener("click", function() {
      center.style.left = "-500vw";
    })
}


//-----------------------FUNCTION FAVOURITE---------------------------



function addFavourite (){

let favtop=0;
let favouritesdivarray=[];
let favouritevalues = [];
let idnumber=0;
    
favourite.addEventListener('click', function(){
favourites.id='favouritesdisplayed';
    
    idnumber++
    
    let div = document.createElement('DIV');
    div.className='favouritesdiv';
    div.innerHTML=locationvalue.value;
    div.style.top=favtop + 'vh';
    div.id=locationvalue.value.slice(0, locationvalue.value.indexOf(','));
    favouritesdivarray.push(div);
    favouritevalues.push(locationvalue.value.slice(0, locationvalue.value.indexOf(',')));
    favtop+=8;
    favourites.appendChild(div);
        console.log('favouritevalues och favouritesdivarray: ' + favouritevalues, favouritesdivarray);
})


favourites.addEventListener("click", doSomething, false);

    
    

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        let favsearch = e.target.id;
        let searchstring = favsearch;
        console.log('Searchstring: ' + searchstring)
        runSearch(searchstring);
    }
    e.stopPropagation();
}

for(i=0;i<favouritesdivarray.length;i++){
    
let arrayindex = i;
favouritesdivarray[i].addEventListener('click', function(){

    });


};
    
    }




//------------------------------------------FUNCTION GET EXPLORE TEXT-------------------------------------------------------------------------------
    function getExplore(place){

  let req = new XMLHttpRequest

  let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + place + "&format=json&origin=*";

  req.open('GET', url);

  req.onreadystatechange = function(event) {

    if (req.readyState == 4){
        let myPlaceParsed = JSON.parse(req.responseText)
        if(myPlaceParsed[2].length!==''){
      console.log('- success!');
    console.log("-----");
    
    let displayedtext = '<h4 style="text-align: center;">Explore ' + place + '</h4><br>'


    displayedtext += myPlaceParsed[2] + '<br>' + '<br>'

    console.log(myPlaceParsed);
    project1Explore.innerHTML = displayedtext
    //project1Explore.style.top='86px';
    project1Explore.style.backgroundImage = 'none'
    };
        };
      
      if(myPlaceParsed[2].length==''){
          
          project1Explore.innerHTML = '<h4 style="text-align: center;">"There is not much adventure going on here. Maybe on your next search!" + "</h4><br>"'
          project1Explore.style.backgroundImage = 'none'
      }
  };

  req.send();


  //console.log('Du sökte: '+ locationvalue.value)




        
        

}

//-----------------------------------FUNCTION GET PHOTOS--------------------------------



    function getPhotos(place){
        
        if(searchedonce==true){
            
            while (project1Photos.hasChildNodes()) {
    project1Photos.removeChild(project1Photos.lastChild);
}
    
        }

let url = "https://pixabay.com/api/?key=4689657-04d96bcd6fe0af53871ffa1fb&q=" + place + "&image_type=photo";
        
        let req = new XMLHttpRequest;

req.open('GET', url);
  

        req.onreadystatechange = function(){
            if( req.readyState == 4 ){
            
                let myImageObject = JSON.parse(req.responseText);
            console.log(myImageObject.hits[0]);
                
                let largerthan = [0-1000];
                let smallerorequalto = 0;
                
                switch(myImageObject.hits.length){
                        
                    
                       
                    case largerthan:
                    for(i=0;i<myImageObject.hits.length;i++){
                    
                    let imageurl = myImageObject.hits[i].webformatURL;
                    let photodiv = document.createElement('IMG');
                    photodiv.className='photodiv';
                    photodiv.addEventListener('click', function(){
                        
                        
                        
                    });
                    photodiv.src=imageurl;
                    project1Photos.appendChild(photodiv)
                    
                }
                        break;
                        
                    case smallerorequalto:
                        project1Photos.innerHTML="<br><br><br><h2 style='text-align:center;'>There are no photos to show, unfortunately.</h2>"
                       
                       }
                
                for(i=0;i<myImageObject.hits.length;i++){
                    
                    let imageurl = myImageObject.hits[i].webformatURL;
                    let photodiv = document.createElement('IMG');
                    photodiv.className='photodiv';
                    photodiv.src=imageurl;
                    project1Photos.appendChild(photodiv)
                    
                }
            
            }; 
            
        };
        
        req.send();
        
        searchedonce = true;

};



//-----------------------------------------------------------FUNCTION GET PLACE ON MAP----------------------------------------------------------



function getPlaceOnMap(place){
    console.log(place + 'här')
        let lat;
        let lng;
          var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': place}, function(results, status) {
        
        if(!results[0]){
            
            console.log('No results')
            
        };
            
        
            
            
          if (status == google.maps.GeocoderStatus.OK) {
             let lat = results[0].geometry.location.lat() 
             let lng = results[0].geometry.location.lng();
              

             
              //console.log('Detta är latitude och longitud: ' + lat, lng)
              
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
      };
        
        myMap();
        project1Map.style.backgroundImage='none';
          }
        
        
        
 

        else {
            alert("Something went wrong " + status);
          }
        });
        

};
           

//-----------------------------------------------------FUNCTION GET WEATHER--------------------------------------------------------------------------
function getWeather() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(event) {
    if (req.readyState == 4) {
      let res = JSON.parse(req.responseText);
        console.log(res)


     let icon = res.weather[0].icon;
      let iconsrc = `http://openweathermap.org/img/w/${icon}.png`;
      // weathericon.src=iconsrc;

     let data = `<div style="margin:auto; text-align:center;"><h2 style="color:white;">${locationvalue.value} weather:</h2><p style=" font-size:4vw;">${res.weather[0].main}, ${res.weather[0].description},
        Wind speed: ${res.wind.speed}, Temperature: ${res.main.temp}, °C <img src=${iconsrc}></p></div>`;
        data.replace("Â", "");
        console.log(data)
        
        //data.indexOf('Â') = ''
      project1Weather.innerHTML = data;
      console.log("spppp")
      //  project1Weather.style.backgroundImage='none'

   }
  };


 req.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${locationvalue.value}&APPID=2d3055ddb7941ccc16f48f3aaeb29121&units=metric`) //es 6
  //req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&APPID=2d3055ddb7941ccc16f48f3aaeb29121');
  req.send();

 //project1Weather.style.top='86px';
}

//-----------------FUNCTION GET WEATHER ENDS------------------


//-------------THESE ARE THE DIVS IN WHICH TO DISPLAY THE API RESPONSES, SHOULD BE SWITCHED TO THE DIVS USED IN THE HTML & CSS TEMPLATE---//
let project1Map = document.getElementById('map');
let project1Explore = document.getElementById('explore');
let project1Weather = document.getElementById('weather');
let project1Photos = document.getElementById('photos');

let contentarray = [];
contentarray.push(project1Map, project1Explore, project1Weather, project1Photos);

    
//---------------------------------------------------------------------------------------------------------------------------//

    let searchbtn = document.getElementById("btn");
    
    
    
    function runSearch(searchstring1){
        getExplore(searchstring1);
        getPlaceOnMap(searchstring1);
        getWeather(searchstring1);
        getPhotos(searchstring1);
        console.log('search from searchbar: ' + searchstring1)
    };


    
function Slide(){
    
    let rightstringarray = ['Explore', 'Weather', 'Photos', ''];
    let leftstringarray = ['', 'Map', 'Explore', 'Weather'];


    
    let leftvalue = -66;
    let leftvaluearray = [];
    
    for(i=0;i<contentarray.length; i++){
    
    leftvalue += 71.5;
    leftvaluearray.push(leftvalue)
    
    newleftvalue = leftvalue.toString() + 'vw'
    
    
    contentarray[i].style.position = 'absolute'
    contentarray[i].style.top = '4vh'
    //contentarray[i].style.outline='3.5px solid #b9beb8'
    contentarray[i].style.height = '85%'
    contentarray[i].style.backgroundSize = "100%"
    contentarray[i].style.opacity='1'
    contentarray[i].style.left=newleftvalue
    contentarray[i].style.transition='1.5s ease'
    contentarray[i].style.float='left'
    //contentarray[i].style.border='2px solid white'
    };
    

        
        let textclockwise = document.getElementsByClassName('rotateclockwise')[0];
        let textcounterclockwise = document.getElementsByClassName('rotatecounterclockwise')[0];

              function arrowInnerHTML(){
                  
        textcounterclockwise.innerHTML = leftstringarray[rightclicks];
        textclockwise.innerHTML = rightstringarray[rightclicks];
        //leftarrow.style.backgroundImage = leftbackgroundarray[rightclicks];
        //rightarrow.style.backgroundImage = rightbackgroundarray[rightclicks];
  
            }
       
        let leftclicks = 0;
        let rightclicks = 0;
        
        leftarrow.addEventListener('click', function(){
                    
        var leftvalue1 = 0
        const sixtysix=71.5;
        
        if(rightclicks>0 && leftclicks<5){
            
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
               
         if(leftclicks<=3 && rightclicks<3){
         rightclicks++
         
         if(leftclicks !== 0){
         leftclicks-- 
         };
         if(leftclicks<=4 && rightclicks<=3){
            for(i=0;i<contentarray.length; i++){
               
                for(i=0;i<leftvaluearray.length;i++){
                    leftvaluearray[i]-=71.5

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
    
 
    
    locationvalue.addEventListener('keydown', function(key){
    if(event.keyCode==13){
        
        if(alternativechosen==true){
        alternativechosen = false;
        console.log(alternativechosen)
      
        divsPositioned();
        
           setTimeout(function(){
            runSearch(locationvalue.value.slice(0, locationvalue.value.indexOf(',')));
        }, 1500);
       }
        
    };
         
});
     


    searchbtn.addEventListener('click', function(){
        
        if(alternativechosen==true){
    alternativechosen = false;

       console.log(alternativechosen)
        divsPositioned();
        
        setTimeout(function(){
            runSearch(locationvalue.value.slice(0, locationvalue.value.indexOf(',')));
        }, 1500);
            
            searchbtn.disabled=true
            
        };
        
});



    




addFavourite()
