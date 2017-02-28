window.load=function(){
	console.log("sdfdsf")
	let ask = document.getElementById("ask");
	let center = document.getElementsByClassName("center")[0];

	ask.addEventListener("click",function(){

	let answer = document.getElementById("answer");
	answer.style.top = "0px";
	center.style.visibility="visible";
	let close = document.getElementById("close");
	close.addEventListener("click",function(){
		center.style.visibility="hidden";
	})
 })
}


