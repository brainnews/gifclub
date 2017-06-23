var dancegifs;
var gifContainer;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 500;

var searchUrl = 'http://api.giphy.com/v1/gifs/search?q=dance&api_key=79994bd6eeb14f4d8df417c81a1bd217&limit=' + searchLimit;

gifContainer = document.getElementById("gif-container");

window.onload = function() {
  GetGifs();
  ShowGif();
};

function GetGifs() {
	$.ajax({
	  url: searchUrl,
	  type: 'GET',
	  success: function(data) {
	  	console.log(data);
		dancegifs = data;
		//ShowGifs();
	  }
	});
}

//data[4].images.downsized.url

function ShowGif() {
	var randomNum = Math.floor((Math.random() * (searchLimit-1)) + 1);
	setTimeout(function () {
      var dancegif = dancegifs.data[randomNum].images.downsized.url;

      $(gifContainer).css({
		"background": "url(" + dancegif + ") no-repeat center center fixed",
		"background-size": "cover"
		});
      ShowGif();

      	//gifIndex++;
      	// if (gifIndex < searchLimit) {
       //  	ShowGif();
      	// }
   	}, 1500)
}