$(document).ready(function () {

    // Display current date
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // Retrieve current hour and convert to an integer
    var currentHour = parseInt(moment().format("k"));

    // Website refreshes every 30 seconds, so the current hour will be properly updated
    var timeInterval = setInterval(function () {

        // If user access website outside hours of 9AM - 5PM, the website will not automatically check hour
        if (currentHour < 9 || currentHour > 17) {
            clearInterval(timeInterval);
        }

    }, 30000);

    // Dynamically add each row of 3 columns
    for (var i = 9; i <= 17; i++) {
        var newRow = $("<section>", { class: "row time-block" });
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

        var colTime = $("<section>", { class: "col-md-1 hour" }).append(time);
        var colText = $("<textarea>", { class: "col-md-10 description" });
        var colSave = $("<button>", { id: "btn" + i, class: "col-md-1 saveBtn" }).append($("<i>", { id: "icon" + i, class: "fas fa-save" }));

        // Print out previously stored data to <textarea>
        colText.text(JSON.parse(localStorage.getItem("btn" + i)));

        newRow.append([colTime, colText, colSave]);
        $(".container").append(newRow);

    }

    // Set background color of textarea based on current hour
    // Past hour - pale gray, current hour - pale red, future hour - pale green
    if (currentHour >= 9) {
        $(".container").find("#btn" + currentHour).prev().css("background-color", "#EED5D2"); // pale red
        for (var j = 9; j < parseInt(currentHour); j++) {
            $("#btn" + j).prev().css("background-color", "#EBEBEB"); // pale gray
        }

        for (var k = parseInt(currentHour) + 1; k <= 17; k++) {
            $("#btn" + k).prev().css("background-color", "#CFDBC5"); // pale green
        }
    } else {
        $("textarea").css("background-color", "#CFDBC5"); // pale green
    }

    // Check whether it's a button being clicked
    function saveText(event) {

        event.preventDefault();

        // Make sure only clicking on a button can trigger the event
        if ($(event.target).is("button") || $(event.target).is("i")) {

            var arrayText = [];
            var inputText = "";
            var numBtn = event.target.id.split("n")[1]; // Get the number in the id
            var buttonClicked = "btn" + numBtn; // Form button id

            arrayText = JSON.parse(localStorage.getItem(buttonClicked)) || [];
            inputText = $("#" + buttonClicked).prev().val(); // Get user input

            // Make sure input is not empty
            if (inputText) {

                // Add input to array then save to local storage
                arrayText.push(inputText);
                localStorage.setItem(buttonClicked, JSON.stringify(arrayText));

                // Display updated text in textarea
                var displayArray = JSON.parse(localStorage.getItem(buttonClicked));
                $("#" + buttonClicked).prev().text(displayArray);

            }
        } 
    }

    // Save text, click event 
    $(document).on("click", saveText);

});