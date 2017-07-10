// VARS

var litModeSwitch = document.getElementById("modeSwitch");
var litMode = true;
var litModeContainer = document.getElementById("litModeContainer");
var limitButton5 = document.getElementById("limitButton5");
var limitButton50 = document.getElementById("limitButton50");
var limitButton500 = document.getElementById("limitButton500");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif magictime"></div><div id="popupGif-2" class="popup-gif magictime"></div><div id="popupGif-3" class="popup-gif magictime"></div><div id="popupGif-4" class="popup-gif magictime"></div><div id="popupGif-5" class="popup-gif magictime"></div><div id="popupGif-6" class="popup-gif magictime"></div><div id="popupGif-7" class="popup-gif magictime"></div><div id="popupGif-8" class="popup-gif magictime"></div><div id="popupGif-9" class="popup-gif magictime"></div><div id="popupGif-10" class="popup-gif magictime"></div><div id="popupGif-14" class="popup-gif magictime"></div><div id="popupGif-15" class="popup-gif magictime"></div><div id="popupGif-16" class="popup-gif magictime"></div>';
var giphySearch = document.getElementById("giphySearch");
var uiContainer = document.getElementById("uiContainer");
var moodsContainer = document.getElementById("moodsContainer");
var staticContainer = document.getElementById("staticContainer");
var searchButton = document.getElementById("searchButton");
var trendingButton = document.getElementById("trendingButton");
var statusContainer = document.getElementById("statusContainer");
var animationFrequency = 10;
var animations = ['slideUpReturn', 'slideDownReturn','slideRightReturn','slideLeftReturn', 'puffIn'];
var hasStarted = false;
var isAndroid = false;
var isIOS = false;

window.onload = function() {
    // PLATFORM CHECK
    if(window.innerHeight > window.innerWidth){
        $(statusContainer).html("⚠︎ Please rotate device");
    } else {
        $(statusContainer).html("✔︎ Ready");
    }
    var os = getOS();

    if (os == "Android") {
        isAndroid = true;
    } else if ( os == 'iOS') {
        isIOS == true;
    }
    GetStatic();
    //GetTrending();
    $(giphySearch).focus();
};

$(window).on("orientationchange",function(){
    if (window.orientation == 0) {
        $(statusContainer).html("⚠︎ Please rotate device");
    } else {
        $(statusContainer).html("✔︎ Ready");
    }
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
    $(giphySearch).focus();
    $(giphySearch).select();
}

$('.mood-channel').click(function() {
    var q = $(this).data("query");
    MoodSearch(q);
});

$(trendingButton).click(function() {
    GetTrending();
    ToggleUI();
})

$(popupGridWrapper).click(function() {
    ToggleUI();
});

$(document).ready(function(){
    $(moodsContainer).children().each(function(i){
        var color = randomColor({ luminosity: 'bright'});
        $(this).css("color", color);
    });
});