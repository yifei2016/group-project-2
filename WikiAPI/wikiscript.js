let searchbtn = document.getElementById('searchbtn');
let searchtext = document.getElementById('searchtext');
let searchvalue;
let responsedisplayed = document.getElementById('response');
searchbtn.addEventListener('click', function(){
    searchvalue=searchtext.value
    
    let req = new XMLHttpRequest
    
        let url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchvalue + "&format=json&origin=*";
    
req.open('GET', url);
    
req.onreadystatechange = function(event) {

	if( req.readyState == 4 )
console.log('- success!');
	console.log("-----");
    let myPlaceParsed = JSON.parse(req.responseText)
  let displayedtext= '';
    
        
       displayedtext+= myPlaceParsed[2] + '<br>'+'<br>'
    responsedisplayed.innerHTML= displayedtext
    console.log(myPlaceParsed);
    

};

req.send();
    

console.log('Du sökte: '+ searchvalue)

    
});


