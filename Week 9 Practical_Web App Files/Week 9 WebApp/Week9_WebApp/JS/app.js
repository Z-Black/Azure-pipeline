//The URIs of the REST endpoint
RAAURI = "https://prod-30.centralus.logic.azure.com/workflows/39c1cabfb3e34d86809eca95fc4feb69/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=s8DVqKdcRBkZ9U08pEhGEYWQD9VenGbMtSPL1bZ5xlg";
CIAURI = "https://prod-23.centralus.logic.azure.com/workflows/49eec65f4f184ba097eedc1206983eab/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=R2enM2WnMt9S667TP0ywmtFyEct0O6ycKhz8ItN9h60";

DIAURI0 = "https://prod-19.centralus.logic.azure.com/workflows/2bc7fa6f20874d4286313294fbd5cea8/triggers/manual/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g3dwMQIt9VKcEBF69DXRQfs2St1O_I5GNkyHEzd9U64";



//Handlers for button clicks
$(document).ready(function () {



  $("#retAssets").click(function () {

    //Run the get asset list function
    getAssetList();

  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {
    

        //Execute the submit new asset function
        submitNewAsset();
    });

    $("#Signup").click(function () {
      // Perform logout actions as needed
      // For example, you can redirect the user back to the login page
      window.location.href = "file:///D:/UU%20Final%20year/Com682/Week%209%20Practical_Web%20App%20Files/Week%206%20-%20WebApp/Week6_WebApp/ImageShare.html"
    })
  });
  
  

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {

  //Construct JSON Object for new item
  var subObj = {
    FirstName: $('#FirstName').val(),
    SurName: $('#SurName').val(),
    Email: $('#Email').val(),
    UserName: $('UserName').val(),
    Password: $('Password').val()
  }
  //Convert to a JSON String
  subObj = JSON.stringify(subObj);
  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    getAssetList();
  });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList() {
  //Replace the current HTML in that div with a loading message 
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  
  $.getJSON(RAAURI, function (data) {
   
    //Create an array to hold all the retrieved assets
    var items = [];
    
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "FirstName: " + val["FirstName"] +  "<br/>");
      items.push( "SurName: " + val["SurName"] + "<br/>");
      items.push( "Email: " + val["Email"] + "<br/>");
      items.push( "UserName: " + val["UserName"] + "<br/>");
      items.push( "Password " + val["Password"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAsset('+val["AssetID"]
+')">Delete</button> <br/><br/>');
    });
    
    //Clear the assetlist div
    $('#AssetList').empty();
    
    //Append the contents of the items array to the AssetList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#AssetList");
  });
}
//Get the JSON from the RAA API 

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data


  //Clear the assetlist div 
 

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteUser(id){
  $.ajax({
  type: "DELETE",
  //Note the need to concatenate the
  url: DIAURI0 + id + DIAURI1,
  }).done(function( msg ) {
  //On success, update the assetlist.
  getAssetList();
  
  });
}
 
