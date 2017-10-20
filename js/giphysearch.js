var channelgifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 50;
var staticGifs;
var staticSearchLimit = 30;

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var trendingUrl = 'https://api.giphy.com/v1/gifs/trending?api_key=' + config + '&limit=50';
var searchUrlPost = '&api_key=' + config + '&limit=';

function GetGifs(q) {
	if (q.includes('#')) {
		var queryWithLimit = q.split('#');
		$.ajax({
		  	url: searchUrlPre + queryWithLimit[0] + searchUrlPost + queryWithLimit[1],
		  	type: 'GET',
		  	success: function(data) {
				channelgifs = data;
				StartGifStream();
		  	}
		});
	} else {
		$.ajax({
		  	url: searchUrlPre + q + searchUrlPost + searchLimit,
		  	type: 'GET',
		  	success: function(data) {
				channelgifs = data;
				StartGifStream();
		  	}
		});
	}

	// $.ajax({
	//   url: searchUrlPre + q + searchUrlPost + searchLimit,
	//   type: 'GET',
	//   success: function(data) {
	// 	channelgifs = data;
	// 	StartGifStream();
	//   }
	// });
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
    clearTimeout(gifStreamTimeout);
    clearTimeout(clearGifsTimeout);
    ClearGifsByInterval();
}

function GetTrending() {
	$.ajax({
	  url: trendingUrl,
	  type: 'GET',
	  success: function(data) {
		channelgifs = data;
		//console.log(channelgifs);
		StartGifStream();
	  }
	});
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
    if (playback) {
    	playback = false;
    	$(playTapeButton).children().html('play_arrow');
    }
}

$(giphySearch).keydown(function( event ) {
	if ( event.which == 13 ) {
		CustomSearch();
	}
});

$(searchButton).click(function(){
	if (giphySearch.value != '') {
		CustomSearch();
	} else {
		giphySearch.value = "Enter something";
	}
})

function CustomSearch() {
	ToggleUI();
	//ResetMusic();
	StopSelectsVisuals();

	var query = giphySearch.value;
	var customSearchLimit;

	if (query.includes('#')) {
		var queryWithLimit = query.split('#');
		$.ajax({
		  	url: searchUrlPre + queryWithLimit[0] + searchUrlPost + queryWithLimit[1],
		  	type: 'GET',
		  	success: function(data) {
				channelgifs = data;
				StartGifStream();
		  	}
		});
	} else {
		$.ajax({
		  	url: searchUrlPre + giphySearch.value + searchUrlPost + searchLimit,
		  	type: 'GET',
		  	success: function(data) {
				channelgifs = data;
				StartGifStream();
		  	}
		});
	}

	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
    if (playback) {
    	playback = false;
    	$(playTapeButton).children().html('play_arrow');
    }
}

function MoodSearch(q, limit) {
	$.ajax({
	  	url: searchUrlPre + q + searchUrlPost + limit,
	  	type: 'GET',
	  	success: function(data) {
		channelgifs = data;
		console.log(channelgifs);
		StartGifStream();
		ToggleUI();
	  }
	});
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
    if (playback) {
    	playback = false;
    	$(playTapeButton).children().html('play_arrow');
    }
}

function GetStatic(){
	$.ajax({
	  url: searchUrlPre + 'static' + searchUrlPost + staticSearchLimit,
	  type: 'GET',
	  success: function(data) {
		staticGifs = data;
		ShowStatic();
	  }
	});
}