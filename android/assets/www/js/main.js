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
var google;
var map;

function initialize()
{
    var mapProp = {
    center:new google.maps.LatLng(31.586040, -97.086380),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
    
    
    google.maps.event.addDomListener(window, 'load', initialize);
};

//NATIVE FEATURES

var pictureSource,
destinationType,
runAcc,
runBrowser;

// device APIs are available
function onDeviceReady() {
    
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    $("#accelerometer").on("pageinit", runAcc);
    $("#browser").on("pageinit", runBrowser);
    
}
// Wait for device API libraries to load
document.addEventListener("deviceready",onDeviceReady,false);

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




