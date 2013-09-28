//Michele Laramore
//AVF 1309



//INSTAGRAM


$('#instagram').on('pageinit', function() {
                   
                   var tag = "dishes_pics",
                   
                   url ="https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=dd55a33c284e4d99b2f703f3e2bdaf53",
                   
                   
                   screenOutput = function(info){
                   
                   
                   console.log(info);
                   
                   
                   $("#data-msg").html("<h2>Instagram results:</h2>");
                   
                   
                   $.each(info.data, function(index, photo) {
                          
                          var pic = "<figure><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' />" + "<h3>" + "<figcaption>" + photo.user.full_name  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + photo.likes.count + "&nbsp;" + "&hearts;" + "'s" + "</figcaption>" + " </h3>" + "</figure>";
                          $("#data-output").append(pic);
                          });
                   };
                   $.getJSON(url, screenOutput);
                   
                   
                   });

//GOOGLE MAPS


function geoLocate() {
    var output = document.getElementById("output");
    
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        
        var mapImg = new Image();
        mapImg.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        
        output.appendChild(mapImg);
    };
    
    function error() {
        output.innerHTML = "Sorry, we are unable to retrieve your location";
    };
    
    output.innerHTML = "<p>Locating…</p>";
    
    navigator.geolocation.getCurrentPosition(success, error);
}

//YOUTUBE

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// create iFrame and YouTube Player

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
                           height: '390',
                           width: '640',
                           videoId: 'Qq6q-AUxdKs',
                           playerVars: { 'controls': 1, 'playlist':['Pf1frjJdrNc', 'KhdeKV7aWwc', '-t7Hwj8E7ME', 'AGGjubzw5ms']},
                           events: {
                           'onReady': onPlayerReady,
                           'onStateChange': onPlayerStateChange
                           }
                           });
}

// Calls function when player is ready
function onPlayerReady(event) {
    event.target.playVideo();
}


var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}



function stopVideo() {
    player.stopVideo();
}


//NATIVE FEATURES

var pictureSource,
destinationType,
runAcc,
runBrowser,
playVideo,
options,
connectionCheck;
// device APIs are available
function onDeviceReady() {
    
    var options = function () {
        pictureSource=navigator.camera.PictureSourceType.CAMERA;
        destinationType=navigator.camera.DestinationType.FILE_URI;};
    
    $("#accelerometer").on("pageinit", runAcc);
    $("#browser").on("pageinit", runBrowser);
    $('#connection').on("pageinit", connectionCheck);
}

// Wait for device API libraries to load
document.addEventListener("deviceready",onDeviceReady,false);

//CAMERA


// Called when a photo is successfully retrieved
function cameraSuccess(imageData) {
    
    console.log(imageData);
    
    // Get image handle
    var smallImage = document.getElementById('smallImage');
    
    // Unhide image elements
    smallImage.style.display = 'block';
    
    // Show the captured photo
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    
    //View the image file URI
    console.log(imageURI);
    
    // Get image handle
    var largeImage = document.getElementById('largeImage');
    
    // Unhide image elements
    largeImage.style.display = 'block';
    
    // Show the captured photo
    largeImage.src = imageURI;
}

// Called if something bad happens.

function cameraFail(message) {
    alert('Failed because: ' + message);
}


// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(cameraSuccess, cameraFail, {
                                quality: 50,
                                savetoPhotoAlbum: true
                                });
}

// A button will call this function
function capturePhotoEdit() {
    // Take picture , allow edit, and retrieve image as base64-encoded string
    
    navigator.camera.getPicture(cameraSuccess, cameraFail, options,{
                                quality: 50,
                                allowEdit: true,
                                savetoPhotoAlbum: true
                                });
}



// A button will call this function
function getPhoto(source) {
    
    // Retrieve image file location from specified source
    
    navigator.camera.getPicture(onPhotoURISuccess, cameraFail, {
                                quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source
                                });
}

//ACCELEROMETER

function onSuccess(acceleration) {
    alert('Accelerometer has loaded!');
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}


// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}

var runAcc = function(){
    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};

//IN APP BROWSER

// Global InAppBrowser reference
var iAppRef = null;

function iAppLoadStart(event) {
    alert(event.type + ' - ' + event.url);
}

function iAppLoadStop(event) {
    alert(event.type + ' - ' + event.url);
}

function iAppLoadError(event) {
    alert(event.type + ' - ' + event.message);
}

function iAppClose(event) {
    alert(event.type);
    iAppRef.removeEventListener('loadstart', iAppLoadStart);
    iAppRef.removeEventListener('loadstop', iAppLoadStop);
    iAppRef.removeEventListener('loaderror', iAppLoadError);
    iAppRef.removeEventListener('exit', iAppClose);
}

// device APIs are available

var runBrowser = function(){
    iAppRef = window.open('http://www.fullsail.edu', '_blank', 'location=yes');
    iAppRef.addEventListener('loadstart', iAppLoadStart);
    iAppRef.addEventListener('loadstop', iAppLoadStop);
    iAppRef.removeEventListener('loaderror', iAppLoadError);
    iAppRef.addEventListener('exit', iAppClose);
};


//CONNECTION
var Connection;
function connectionCheck() {
    var connectType = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    
    alert('Connection type: ' + states[connectType]);
}





