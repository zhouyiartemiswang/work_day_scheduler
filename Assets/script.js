$(document).ready(function () {

    // Display current date
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    var currentHour = moment().format("k");

    var timeInterval = setInterval(function () {
        // console.log(currentHour);
        if (currentHour < 9 || currentHour > 17) {
            clearInterval(timeInterval);
        }
    }, 30000);


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

        colText.text(JSON.parse(localStorage.getItem("btn" + i)));

        newRow.append([colTime, colText, colSave]);
        $(".container").append(newRow);
    
    }

    // console.log(typeof currentHour);
    if (parseInt(currentHour) >= 9) {
        $(".container").find("#btn" + currentHour).prev().css("background-color", "#EED5D2"); // pale red
        for (var j = 9; j < parseInt(currentHour); j++) {
            $("#btn" + j).prev().css("background-color", "#EBEBEB"); // pale gray
        }

        for (var k = parseInt(currentHour) + 1; k <= 17; k++) {
            $("#btn" + k).prev().css("background-color", "#CFDBC5");
        }
    } else {
        $("textarea").css("background-color", "#CFDBC5"); //pale green
    }

    // localStorage.getItem()
    // Check whether it's a button being clicked
    function saveText(event) {
        event.preventDefault();
        
        // console.log($(event.target).is("i"));
        if ($(event.target).is("button") || $(event.target).is("i")) {
            var arrayText = [];
            var inputText = "";
            var numBtn = 0;
            var buttonClicked = "";
            var idClicked = event.target.id;
            numBtn = idClicked[idClicked.length - 1];
            buttonClicked = "#btn" + numBtn;
            
            console.log("event target id: " + event.target.id);
            console.log(idClicked.length);
            console.log(idClicked[idClicked.length - 1]);
            console.log("numBtn: " + numBtn);
            console.log("buttonClicked: " + buttonClicked);
            console.log("idClicked: " + idClicked);
            arrayText = JSON.parse(localStorage.getItem("btn" + numBtn)) || [];
            inputText = $(buttonClicked).prev().val();
            // console.log(typeof arrayText);
            // console.log(arrayText);
            // console.log(inputText);
            if (inputText) {
                arrayText.push(inputText);
                localStorage.setItem("btn" + numBtn, JSON.stringify(arrayText));
            }
            console.log(localStorage.getItem("btn" + numBtn));

            var displayArray = JSON.parse(localStorage.getItem("btn" + numBtn));
            console.log(displayArray);
            $(buttonClicked).prev().text(displayArray);
            // displayArray.forEach(function(textEl) {
            //     var newLine = $("<li>").text(textEl);
            //     console.log(newLine);
            //     $(buttonClicked).prev().append(newLine);
            // });
        }
    }

    $(document).on("click", saveText);

});

