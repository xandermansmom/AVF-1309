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

function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(31.586040, -97.086380),
  zoom:5,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
var map=new google.maps.Map(document.getElementById("map-canvas")
  ,mapProp);


google.maps.event.addDomListener(window, 'load', initialize);
};

