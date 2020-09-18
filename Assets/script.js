$(document).ready(function () {

    // Display current date
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

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

    // Check whether it's a button being clicked
    $(this).on("click", function(event) {

        event.preventDefault();

        if ($(event.target).is("button")) {
            // console.log(event.target.id);
            saveText(event.target.id);
        }

    });

    function saveText(targetId) {
        // var buttonClicked = "#" + targetId;
        // console.log($(buttonClicked));
        // console.log($(buttonClicked).siblings("textarea").text());
        // var inputText = JSON.parse(localStorage.getItem($(buttonClicked).siblings("textarea").text()));
        // localStorage.setItem(targetId, JSON.stringify(inputText));

        // var inputText = $(buttonClicked).siblings("textarea").text();
        // localStorage.setItem(targetId, inputText);
    }
    // for(var j = 0; j <= 17; j++) {
    //     $("#")
    // }
});

