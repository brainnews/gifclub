// VARS

var litModeSwitch = document.getElementById("modeSwitch");
var litMode = true;
var limitButton5 = document.getElementById("limitButton5");
var limitButton50 = document.getElementById("limitButton50");
var limitButton500 = document.getElementById("limitButton500");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif magictime"></div><div id="popupGif-2" class="popup-gif magictime"></div><div id="popupGif-3" class="popup-gif magictime"></div><div id="popupGif-6" class="popup-gif magictime"></div><div id="popupGif-7" class="popup-gif magictime"></div><div id="popupGif-8" class="popup-gif magictime"></div><div id="popupGif-9" class="popup-gif magictime"></div><div id="popupGif-10" class="popup-gif magictime"></div><div id="popupGif-11" class="popup-gif magictime"></div><div id="popupGif-12" class="popup-gif magictime"></div><div id="popupGif-14" class="popup-gif magictime"></div><div id="popupGif-15" class="popup-gif magictime"></div><div id="popupGif-16" class="popup-gif magictime"></div>';
var giphySearch = document.getElementById("giphySearch");
var uiContainer = document.getElementById("uiContainer");
var moodsContainer = document.getElementById("moodsContainer");
var staticContainer = document.getElementById("staticContainer");
var searchButton = document.getElementById("searchButton");
var trendingButton = document.getElementById("trendingButton");
var statusContainer = document.getElementById("statusContainer");
var stopRecordingButton = document.getElementById("stopRecordingButton");
var playTapeButton = document.getElementById("playTapeButton");
var deleteTapeButton = document.getElementById("deleteTapeButton");
var recordTapeButton = document.getElementById("recordTapeButton");
var iphoneUiButton = document.getElementById("iphoneUiButton");
var gpmRange = document.getElementById("gpmRange");
var gpmContainer = document.getElementById("gpmContainer");
var pausePlayButton = document.getElementById("pausePlayButton");
var recordTapeArray = [];
var playback = false;
var isMobile = false;

//to do
// cookies for feature discovery
// firebase to save tapes
// switch to turn off lit mode

window.onload = function() {
    // PLATFORM CHECK
    var os = getOS();

    if (os == 'Android') {
        isMobile = true;
    } else if ( os == 'iOS') {
        isMobile == true;
        $(iphoneUiButton).removeClass('hide');
    }

    GetStatic();
};

$(document).ready(function(){
    $('ul.tabs').tabs();
  });

// SEARCH FUNCTIONS

function SetSearchLimit(limit, button) {
    searchLimit = limit;
    $(button).toggleClass("limit-button-active");
    $(button).siblings().removeClass("limit-button-active");
}

$(limitButton5).click(function() {
    SetSearchLimit(5, limitButton5);
});

$(limitButton50).click(function() {
    SetSearchLimit(50, limitButton50);
});

$(limitButton500).click(function() {
    SetSearchLimit(500, limitButton500);
});

function BlurSearch(){
    $(giphySearch).blur();
}

function ToggleUI() {
    $(uiContainer).fadeToggle(300);
}

$('.mood-channel').click(function() {
    var q = $(this).data("query");
    var l = $(this).data("limit");
    MoodSearch(q, l);
    ResetMusic();
});

$('.select-channel').click(function() {
    ResetMusic();
    var q = $(this).data("playlist");
    LoadSoundToWidget(selects[q].playlist, selects[q].timeline, selects[q].gpm);
    ToggleUI();
});

$(trendingButton).click(function() {
    GetTrending();
    ResetMusic();
})

$(popupGridWrapper).click(function() {
    if (!recording) {
        ToggleUI();
    }
});

$(iphoneUiButton).click(function() {
    if (!recording) {
        ToggleUI();
    }
});

$(document).ready(function(){
    $(moodsContainer).children().each(function(i){
        var color = randomColor({ luminosity: 'bright'});
        $(this).css("color", color);
    });
});

$(recordTapeButton).click(function() {
    ToggleUI();
    $(stopRecordingButton).fadeToggle(100);
    recording = true;
    if (playback) {
        $(playTapeButton).children().html('play_arrow');
    }
});

$(stopRecordingButton).click(function(){
    recording = false;
    $(stopRecordingButton).fadeToggle(100);
    ToggleUI();
});

var paused = false

$(pausePlayButton).click(function(){
    if (!paused) {
        widget.setVolume(0);
        $(this).removeClass('fa-volume-up');
        $(this).addClass('fa-volume-off');
        paused = true;
    } else {
        widget.setVolume(100);
        $(this).removeClass('fa-volume-off');
        $(this).addClass('fa-volume-up');
        paused = false;
    }
});

$(popupGridWrapper).on('click', '> *', function(event) {
    var gif = event.target;
    if (recording) {
        recordTapeArray.push(gif.firstChild.src);
        $(gif).addClass('magictime swashOut');
    }
});

$(deleteTapeButton).click(function(){
    if (!playback) {
        recordTapeArray = [];
    } else {
        playback = false;
        //might need to set a timeout here
        recordTapeArray = [];
    }
});

$(playTapeButton).click(function(){
    if (recordTapeArray.length != 0 && playback == false) {
        playback = true;
        $(this).children().html('stop');
        $(this).removeClass('tape-empty');
    } else if (recordTapeArray.length != 0 && playback == true) {
        $(this).children().html('play_arrow');
        playback = false;
    } else {
        $(this).addClass('tape-empty');
    }
});

gpmRange.value = 1400;

$(gpmRange).change(function(){
    gpm = gpmRange.value;
});

$(gpmRange).on('input', function () {
    var currentGpmRange = gpmRange.value;

    if (currentGpmRange == 300) {
        $(gpmContainer).html('💀 💀 💀');
    } else if (currentGpmRange <= 600) {
        $(gpmContainer).html('😰 😰 😰');
    } else if (currentGpmRange <= 1000) {
        $(gpmContainer).html('😮 😮 😮');
    } else if (currentGpmRange <= 2000) {
        $(gpmContainer).html('🔥 🔥 🔥');
    } else if (currentGpmRange <= 2500) {
        $(gpmContainer).html('🏝 🏝 🏝');
    } else if (currentGpmRange <= 3000) {
        $(gpmContainer).html('😴 😴 😴');
    } else {
        $(gpmContainer).html('Error');
    }
});

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});