//Michele Laramore
//AVF 1309

//SAVE RECORD
var editKey = null;
var food = {};

function saveData() {

if (editKey === null){
     var foodId = Math.floor(Math.random() * 100000001); 
          console.log(foodId);
    }else{
         editKey = {
             _id: editKey._id,
             _rev: editKey._rev 
    };
          console.log(editKey);        
        
    }
    //Gather form field values and store in an object
    //Object properties contain an array with the form label and input value
   
    food.dish = ["Add a Dish:", $("#dish").val()];
    food.category = ["Type of Dish:", $("#cat").val()];
    food.rating = ["Rating:", $("#rate").val()];
    food.restaurant = ["Restaurant:", $("#restaurant").val()];
    food.favorite = ["Favorite:", $('#favorite').is(':checked')];
    food.comment = ["Comment:", $("#comment").val()];

   console.log(food);
    $.couch.db("asd").saveDoc(food, {
        success: function (data) {
        console.log(data);
            alert("Food Rating Data is Saved!");
        },
        error: function(status) {
        console.log(status);
        }
     });
}
   

$("#save").on("click", function(){
   saveData(editKey);
   $.mobile.changePage('#view'); 
    return false;
 });


//DELETE RECORD
function deleteThis(id, rev) {
    if (localStorage.length === 0) {
        alert("There are no records to delete.");
    } else {
        if (confirm("Are you sure you want to delete this record?")) {
            $.couch.db('asd').removeDoc({
                _id: "",
                _rev: ""
            }, {
                success: function (data) {
                    alert("The record has been deleted.");
                    location.reload("#");
                    return false;
                }
            });
        }
    }
}


//$.mobile.changePage("#view");

///CLEAR RECORD
function clearData() {
    //Hide Clear Button & Alert if no data in local storage
    if (localStorage.length === 0) {
        alert("There is no data to delete.");
    } else {
        //If there is data to clear, confirm you want to delete all local storage
        if (confirm("Are you sure you want to delete all the entries ? ")) {
            localStorage.clear();
            alert("All data is cleared.");
            $.mobile.changePage("#home");
            return false;
        }
    }

}
 //Run clearData function                  
$("#clear").on("click", clearData);
        
//EDIT RECORD
var editThis = function (id, rev) {
 editKey = {
               _id: editKey._id,
               _rev: editKey._rev 
            };    
    //populate fields with localStorage data

    //$.mobile.changePage("#add");


    $('#dish').val(food.dish[1]);
    $('#cat').val(food.category[1]).selectmenu("refresh");
    $('#rate').val(food.rating[1]).selectmenu("refresh");
    $('#restaurant').val(food.restaurant[1]);
    if (food.favorite[1] === true) {
        $("#favorite").attr('checked', true).checkboxradio('refresh');
    }
    $('#comment').val(food.comment[1]);
    $('#save').prev('.ui-btn-inner').children('.ui-btn-text').html('Update');
    $("#save").val('Update').data('id');
};

var editButton = $("<button><a href='#add' id='edit'>Edit Record</a></button>");
editButton.on('click', function (id, rev) {
    $.couch.db("asd").openDoc(id, {
        success: function (data) {
            editKey = {
               _id: editKey._id,
               _rev: editKey._rev 
            };
            console.log(editKey);
            $("#dish").val(food.rating);
            $("#restaurant").val(food.restaurant);
            $("#favorite").val(food.favorite);
            $("#comment").val(food.comment);
            console.log(editKey);
        }
    });
});
  

var deleteButton = $("<button><a href='#' id='delete'>Delete Record</a></button>");
deleteButton.on('click', function (id, rev) {
    editKey = {
                _id: editKey._id,
             _rev: editKey._rev 
    };
    console.log(editKey);
    var ask = confirm("Are you sure you want to delete this Record?");
    if (ask) {
        $.couch.db("asd").removeDoc(editKey, {
            success: function (data) {
                editKey = null;

                window.location.reload("#");
            }
        });
    }
});

var urlVars = function()
{
    var urlData = $($.mobile.activePage).data("url");
    var urlParts = urlData.split('?');
    var urlPairs = urlParts[1].split('&');
    //loop over the pairs
    var urlValues = {};
    for (var pair in urlPairs)
    {
        var keyValue = urlPairs[pair].split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        urlValues[key] = value;
    }
    return urlValues;
};


//HOME PAGE
$('#home').on('pageinit', function () {
    //code needed for home page goes here
});


//ADD PAGE
$(document).on('pageinit', '#add', function (e) {

    $('#addForm').validate({
        //Run if validation errors occur
        invalidHandler: function (form, validator) {
            var empty = '';
            if (empty === true) {
                e.preventDefault();
                return;
            }
        },

        //Run if valid       
        submitHandler: function (form) {
            saveData();
            alert("Submitting Form!");
           location.reload(true);
        }

    });
});

//VIEW


//INSTAGRAM
 
 $('#instagram').on('pageinit', function() {

    var tag = "dishes_pics";

    var url ="https://api.instagram.com/v1/tags" + tag + "media/recent?callback=?&amp;client_id=dd55a33c284e4d99b2f703f3e2bdaf53";
    

    $.getJSON(url, screenOutput); 

     var screenOutput = function(info){
        console.log(info);


    $("#data-msg").html("<h2>Instagram results:</h2>");


    $.each(info.data, function(index, photo) {

    var pic = "<img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "<h4>" + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4>";
        
        $("#data-output").append(pic);
    }); 
};

    
});


