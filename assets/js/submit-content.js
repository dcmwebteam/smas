const cloudName = "smas";
const unsignedUploadPreset = "s2d4qhar";

var contentUrl = "";

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function(e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

// ************************ Drag and drop ***************** //
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Reset the upload progress bar
   document.getElementById('progress').style.width = 0;
  
  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').style.width = progress + "%";

  //   console.log(`fileuploadprogress data.loaded: ${e.loaded},
  // data.total: ${e.total}`);
  });

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, 'w_150,c_scale');
      // console.log(tokens);
      // console.log(response);
      // console.log("fd......" + url);//resource type
      contentUrl = url;
    if(tokens[4] === "image" ){
        var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;
      img.className = "uploadedImage";
      document.getElementById('gallery').appendChild(img);
    }
        else if(tokens[4] === 'video'){
            var newVideo = document.createElement("VIDEO");
            var newSource = document.createElement("SOURCE");

            // newVideo.width = 150;
            // newVideo.height = 150;
            newVideo.controls = true;
            newSource.src = tokens.join('/');
            newSource.type = "video/" + response.format;
            newVideo.appendChild(newSource);
            // newVideo.alt = response.public_id;
            // newVideo.className = "uploadedImage";
            document.getElementById('gallery').appendChild(newVideo);

        }
        

      
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  // console.log("fd......" + fd);
  xhr.send(fd);
}

// *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    uploadFile(files[i]); // call the function to upload the file
  }
};





$(document).ready(function(){

    // $('#submitModal').modal(options)
    $('#successfull-response').hide();

  let name="";
  let email ="";
  let twitter="";
  let instagram="";
  let phone="";
  let affiliation="";
  let promoteType="";
  // let suggestPublish="";
  let comment="";
  
  // $(":input").inputmask();

  $("#phone_input").inputmask({"mask": "(999) 999-9999"});

  $('#form').submit(function(e){

    if($('#name_input').val() == ''){
        alert('Please fill the form first.');
        return false;
    }
    e.preventDefault();

    name = $('#name_input').val();
    email = $('#email_input').val();
    twitter = $('#twitter_input').val();
    instagram = $('#instagram_input').val();
    phone = $('#phone_input').val();
    affiliation = $( "input[name='affiliation']:checked" ).val();
    promoteType = $( "input[name='promote']:checked" ).val();
    comment = $('#content_comment_input').val();
    var checkboxValues = [];
    $('input[type="checkbox"]:checked').each(function(index, elem) {
        checkboxValues.push($(elem).val());
    });
    // suggestPublish = $(":checkbox:checked").val();


    // console.log(name, email, twitter, instagram, phone, affiliation, promoteType, comment, checkboxValues);
    
    const formInfo = {
      name: name,
      email: email,
      twitter: twitter,
      instagram: instagram,
      phone: phone,
      affiliation: affiliation,
      promoteType: promoteType,
      suggestPublish: checkboxValues,
      comment: comment,
      contentUrl: contentUrl
    }

    // console.log(formInfo);

    // $(".submit-header-text").hide();
    // $(".form-section-row").hide();
    // $("#successfull-response").show();




     // Initialize Firebase
     var config = {
      apiKey: "AIzaSyAIkCalBHnPBaD288dVTjSumW_HHd2ptac",
      authDomain: "social-media-at-stevens-f4fff.firebaseapp.com",
      databaseURL: "https://social-media-at-stevens-f4fff.firebaseio.com",
      projectId: "social-media-at-stevens-f4fff",
      storageBucket: "",
      messagingSenderId: "271744188217"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var messagesRef = database.ref('messages');

    var newMessageRef = messagesRef.push();
    newMessageRef.set({
     messageInfo: formInfo
    });


    $('.modal').modal('show');
    document.getElementById("form").reset();
    setTimeout(function () { window.location.reload(); }, 3000);

    // handleFiles(files);
  });




});