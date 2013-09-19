//Michele Laramore
//AVF 1309

//DECLARE FUNCTIONS FOR STORAGE
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Transaction error callback
//
function errorCB(tx, err) {
    alert("Error processing SQL: "+err);
}

// Transaction success callback
//
function successCB() {
    alert("success!");
}



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


//ON DEVICE READY DO THIS FUNCTION
var onSuccess;
var onError;

function onDeviceReady() {
    var pictureSource=navigator.camera.PictureSourceType;
    var destinationType=navigator.camera.DestinationType;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    navigator.accelerometer.getCurrentAcceleration (onSuccess, onError);
    var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);
}


//ADD EVENT LISTENER
document.addEventListener("deviceready", onDeviceReady, false);


//CAMERA

var pictureSource;   // picture source
var destinationType; // sets the format of returned value


// Called when a photo is successfully retrieved

function onPhotoDataSuccess(imageData) {
       var smallImage = document.getElementById('smallImage');
    
    // Unhide image elements
    smallImage.style.display = 'block';
    
    // Show the captured photo
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
     console.log(imageURI);
    
    // Get image handle
    var largeImage = document.getElementById('largeImage');
    
    // Unhide image elements
    largeImage.style.display = 'block';
    
    // Show the captured photo
    largeImage.src = imageURI;
}

// A button will call this function
var onFail;
function capturePhoto() {
    
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}

// A button will call this function

function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source });
}

// Show image
//
function cameraCallback(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}

//GEOLOCATION//

var geoMap;
var handleNoGeolocation;

function initialize() {
    var mapOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    geoMap = new google.maps.Map(document.getElementById('map-draw'),
                                 mapOptions);
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                                                 var pos = new google.maps.LatLng(position.coords.latitude,
                                                                                  position.coords.longitude);
                                                 
                                                 var infowindow = new google.maps.InfoWindow({
                                                                                             map: geoMap});
                                                 
                                                 map.setCenter(pos);
                                                 }, function() {
                                                 handleNoGeolocation(true);
                                                 });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

var content;
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        content = 'Error: The Geolocation service failed.';
    }
    var options = {
    map: geoMap,
    position: new google.maps.LatLng(60, 105),
    content: content
    };
    
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

//ACCELEROMETER

function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}
                       

// onError: Failed to get the acceleration
function onError() {
    alert('onError!');
}


//STORAGE

// Wait for device API libraries to load

document.addEventListener("deviceready", onDeviceReady, false);

// Populate the database




















