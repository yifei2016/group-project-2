let search = document.getElementById("search");

let searchBtn = document.getElementById("searchbtn");

searchBtn.addEventListener("click", function(){
    
    let searchvalue = search.value;
    loadDoc(searchvalue);
});

//AJAX
let parseJson;
function loadDoc(searchvalue) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('A1').innerHTML = this.status;
      document.getElementById('A2').innerHTML = this.statusText;
     
        // parseJson = JSON.parse(this.responseText);
        var myParsed = JSON.parse(this.responseText);
        
         document.getElementById('A3').innerHTML = myParsed.pages[0].extract;
        console.log(myParsed);
    }
  };
    //summary
  //xhttp.open("GET", "https://en.wikipedia.org/api/rest_v1/page/summary/"+searchvalue+"?redirect=true", true);
    //more info than summary
    xhttp.open("GET", "https://en.wikipedia.org/api/rest_v1/page/related/"+searchvalue+"?redirect=true", true);
    
  xhttp.send();
}
