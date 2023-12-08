//The URIs of the REST endpoint
IUPS = "https://prod-72.eastus.logic.azure.com:443/workflows/1bb0d2cd01724238b9ce411c4f2c686c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6aT0LZWyDPLCWd0AbJsLQU1nxZYZkIYYSVpyM1l8Nkg";
RAI = "https://prod-85.eastus.logic.azure.com:443/workflows/1566155f2513485bb039e8ec7b46fa9f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NJEcribsTGth8Z5kMgWGVidKkF6OakPAYOoriAwAdNo";
DIAURI0 = "https://prod-19.centralus.logic.azure.com/workflows/2bc7fa6f20874d4286313294fbd5cea8/triggers/manual/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g3dwMQIt9VKcEBF69DXRQfs2St1O_I5GNkyHEzd9U64";
BLOB_ACCOUNT = "https://blobstoragecom682zjb.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewAsset();

  });
  $("#logoutBtn").click(function () {
    // Perform logout actions as needed
    // For example, you can redirect the user back to the login page
    window.location.href = "file:///D:/UU%20Final%20year/Com682/Week%209%20Practical_Web%20App%20Files/Week%209%20WebApp/Week9_WebApp/login.html"
  })
});


//A function to submit a new asset to the REST endpoint
function submitNewAsset() {
  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);
  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
    }
  });
}



//Construct JSON Object for new item
var subObj = {
  FileName: $('#FileName').val(),
  userID: $('#userID').val(),
  userName: $('#userName').val(),
  File: $('#File').val(),
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




//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  $.getJSON(RAI, function (data) {
    //Create an array to hold all the retrieved assets
    var items = [];
    //Iterate through the returned records and build HTML, incorporating the key values of therecord in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/> <br/>")
      items.push("File : " + val["fileName"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br/>");
      items.push("<hr />");
      items.push('<button type="button" id="Delete" class="btn btn-danger" onclick="deleteFile('+val["UserID"]
+')">Delete</button> <br/><br/>');
    });


    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });
}

function deleteAsset(userID){
  $.ajax({
  type: "DELETE",
  //Note the need to concatenate the
  url: DIAURI0 + userID + DIAURI1,
  }).done(function( msg ) {
  //On success, update the assetlist.
  getAssetList();
  
  });
}


  


