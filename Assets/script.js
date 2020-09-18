$(document).ready(function () {

    // Display current date and hour
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    var currentHour = moment().format("k");

    // In a for loop, create one row. time: 9-17 

    for (var i = 9; i <= 17; i++) {
        var numBtn = "btn" + i;
        var newRow = $("<section>", {class: "row time-block"});
        var time = $("<span>");

        if (i <= 11) {
            time.text(i + "AM");
        }
        else if (i === 12) {
            time.text("12PM");
        }
        else {
            time.text(i - 12 + "PM");
        }

        var colTime = $("<section>", {class: "col-md-1 hour"}).append(time);
        var colText = $("<textarea>", {class: "col-md-10 description"});
        var colSave = $("<button>", {id: numBtn, class: "col-md-1 saveBtn"}).append($("<i>", {class: "fas fa-save"}));

        newRow.append([colTime, colText, colSave]);
        $(".container").append(newRow);

    }
    console.log("#btn" + currentHour);
    if (currentHour >= 9) {
        $(".container").find("#btn" + currentHour).prev().css("background-color", "#EED5D2");
        for (var j = 9; j < currentHour; j++) {
            $("#btn" + j).prev().css("background-color", "#EBEBEB");
        }
    
        for (var k = currentHour + 1; k <= 17; k++) {
            $("#btn" + k).prev().css("background-color", "#CFDBC5");
        }
    } else {
        $("textarea").css("background-color", "#CFDBC5"); 
    }
    
    // function saveText(targetId) {
    //     var buttonClicked = "#" + targetId;
    //     localStorage.setItem(targetId, $(buttonClicked).prev().val());

    //     // console.log($(buttonClicked));
    //     // console.log($(buttonClicked).prev().val());
    //     // var inputText = JSON.parse(localStorage.getItem($(buttonClicked).prev().val()));
    //     // var inputText = localStorage.getItem($(buttonClicked).prev().val());
    //     // console.log(inputText);

    //     // var inputText = $(buttonClicked).prev().val();
    //     // localStorage.setItem(targetId, inputText);
    // }

    // Check whether it's a button being clicked
    function check(event) {
        event.preventDefault();

        if ($(event.target).is("button")) {
            // console.log(event.target.id);
            // saveText(event.target.id);
            var buttonClicked = "#" + event.target.id;
            localStorage.setItem(event.target.id, $(buttonClicked).prev().val());
        }
    }

    $(this).on("click", check);

});

