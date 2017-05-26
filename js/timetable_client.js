/**
 * Created by Falade James on 5/5/2017.
 */

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    Parse.User.logIn("james","james").then(function (u) {
        console.log("logged in");
    })
});

function assignExam()
{
    Materialize.toast('Please wait.... Assigning courses...', 4000);


    Parse.Cloud.run("allocate_periods",{id:""}).then(function (response) {
        console.log(response);
    });
}
function finaliseInv() {
    console.log("upload inv");

    var fileUploadControl = $("#inv_file")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "invigilators.xlsx";

        var parseFile = new Parse.File(name, file);

        parseFile.save().then(function() {

            var f= new Parse.Object.extend("ExamInvigilatorsUploads");
            f.set("invigilators",file);

            f.save().then(function (a) {

                alert("File Uploaded")
            },function (e) {
                console.error(e.message);
            })

            // The file has been saved to Parse.
        }, function(error) {
            console.error(error.message);
            // The file either could not be read, or could not be saved to Parse.
        });
    }
}

function uploadInv() {
    console.log("upda");
    $('#invigilators_mod').modal('open');
}