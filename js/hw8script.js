/*
    FILE: /~sgiorlan/Assignment7/js/hw8script.js
    91.61 GUI Programming I Assignment No.8: Using the jQuery UI Slider and Tab Widgets
    Scott T. Giorlando, UMass Lowell Computer Science, scott_giorlando@student.uml.edu
    File Created on: 12/6/2019 12:40 PM.
        Updated by STG on 12/8/2019 4:52 PM

    File Description: This file is a script for my website which will give my website most of its functionality.

    This file did pass the validator required.
*/

/*
Set variable count = 0.  This will be important when deleting the tabs for the tables.
*/
var count = 0;

/*
Process form when submit button is pressed and return false so the page is not refreshed every time.
*/
function readForm(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}

/*
Here I use attachEvent to the submit button so the vents can be used in IE8 or lower.
addEventListener will add a function to the event's stack instead of overwriting it, I read about both of these online and it was mentioned to be used in practice.
*/
var form = document.getElementById('userForm');
if (form.attachEvent) {
    form.attachEvent("submit", readForm);
} else {
    form.addEventListener("submit", readForm);
}

/*
Function generateTable takes 5 parameters, a row beginning a row end a column start and a column end, as well as a table object this is the range of the 4 inputs for the user.
It then creates a table with those ranges given after running through some validations to make sure there aren;t any errors.

Once that check is done this again has a check to see if the user's value is below 0 or not.  This is to be sure the table doesn't enter values that are below 0 and an
error message is printed.

If none of those issues are found then it will display a message about generating the table with their multiplier and multiplicand and the range of them.
Then generateTable will start making both the rows and columns to the specific range the user submitted.
*/

function generateTable(rowStart, rowEnd, colStart, colEnd, targetTable) {
    document.getElementById(targetTable).innerHTML = "";
    document.getElementById("userSubmission").innerHTML = "";

    if (Number(rowStart) > Number(rowEnd)) {
        console.log("Swapping the beginning and end values of the row of the table.")
        var tempStart = rowStart;
        rowStart = rowEnd;
        rowEnd = tempStart;
        document.getElementById("userSubmission").innerHTML = "<h4>Swapping the beginning and end row values.</h4>";
    }
    if (Number(colStart) > Number(colEnd)) {
        console.log("Swapping the beginning and end values of the column of the table.")
        var tempStart = colStart;
        colStart = colEnd;
        colEnd = tempStart;
        document.getElementById("userSubmission").innerHTML += "<h4>Swapping the beginning and end column values.</h4>";
    }
    //If any values are blank then abort
    //table creation and print out error msg
    if (colStart == "" || colEnd == "" || rowStart == "" || rowEnd == "") {
        document.getElementById("userSubmission").innerHTML = "";
    }
    else if (Number(rowStart) > 100 || Number(rowEnd) > 100 || Number(colStart) > 100 || Number(colEnd) > 100) {
      document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot have their entry numbers be greater than 100!</h2>";
    }
    else if (Number(rowStart) < 0 || Number(rowEnd) < 0 || Number(colStart) < 0 || Number(colEnd) < 0) {
      document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot have their entry numbers be less than 0!</h2>";
    }
    /*
    This executes if all the validations pass, which are if the beginning number is smaller than the end number.
    Those numbers get swapped, and this also checks if the user tries to put a number above 100 in the table so it doesn't break.
    */
        else {
            rowStart = Number(rowStart);
            rowEnd = Number(rowEnd);
            colStart = Number(colStart);
            colEnd = Number(colEnd);
            document.getElementById("userSubmission").innerHTML += "<h4>Creating a multiplication table with values from: " + rowStart + '-' + rowEnd +
            " and multiplying them with values from " + colStart + "-" + colEnd + ".</h4>";

            /*
            Here in the function I take the table output ID and start using loops to insert each cell with the numbers in the range that the user specified.
            For example, if the user put 1-5 for their columns then my loop will start at 1 and go up to 5 and fill each cell with the specific number.  For each inner cell
            the loop will take the rows and multiply it by the column, which is why it is a nested loop.
            */
            var table = document.getElementById(targetTable);
            for (var i = colStart; i <= colEnd; i++) {
                var row = table.insertRow(i - colStart);
                for (var j = rowStart; j <= rowEnd; j++) {
                    var tableCell = row.insertCell(j - rowStart);
                    tableCell.innerHTML = i * j;
                }
                var tableCell = row.insertCell(0);
                tableCell.innerHTML = i;
            }

            /*
            This makes the range of the table.
            */
            var row1 = table.insertRow(0);
            for (let k = rowStart; k <= rowEnd; k++) {
                var tableCell = row1.insertCell(k - rowStart);
                tableCell.innerHTML = k;
            }

            /*
            This is the top left corner of the table, I put a * to show that this is a multiplication table.
            */
            var tableCell = row1.insertCell(0);
            tableCell.innerHTML = "*";
        }
}


/*
This jQuery function is the function that will tkae the input of the slider and change the table dynamically
to the value of the slider at that specific point.  The range is 1 to 100.
*/
(function($){
    var sliderOpts = {
        min: 1,
        max: 100,
        value: 1,
        slide: function() {

            var multiplierSlider1 = $("#fMultiplierSlider").slider("value"),
            multiplierSlider2 = $("#lMultiplierSlider").slider("value"),
            multiplicandSlider1 = $("#fMultiplicandSlider").slider("value"),
            multiplicandSlider2 = $("#lMultiplicandSlider").slider("value");
            $("#firstMultiplier").val(multiplierSlider1);
            $("#lastMultiplier").val(multiplierSlider2);
            $("#firstMultiplicand").val(multiplicandSlider1);
            $("#lastMultiplicand").val(multiplicandSlider2);
            generateTable(document.getElementById('firstMultiplier').value,
                          document.getElementById('lastMultiplier').value,
                          document.getElementById('firstMultiplicand').value,
                          document.getElementById('lastMultiplicand').value,
                          "tOutput");
        }
    };
    $("#fMultiplierSlider").slider(sliderOpts);
    $("#lMultiplierSlider").slider(sliderOpts);
    $("#fMultiplicandSlider").slider(sliderOpts);
    $("#lMultiplicandSlider").slider(sliderOpts);
})(jQuery);


/*
This jQuery function is what adjusts the slider if the user enters text into the text field.
This also adjusts the table dynamically as well.
*/
$(function () {
    $("#firstMultiplier").change(function() {
        var value = this.value;
        $("#fMultiplierSlider").slider("value",value);
        generateTable(value,
                      document.getElementById('lastMultiplier').value,
                      document.getElementById('firstMultiplicand').value,
                      document.getElementById('lastMultiplicand').value,
                      "tOutput");
    });
    $("#lastMultiplier").change(function() {
        var value = this.value;
        $("#lMultiplierSlider").slider("value",value);
        generateTable(document.getElementById('firstMultiplier').value,
                      value,
                      document.getElementById('firstMultiplicand').value,
                      document.getElementById('lastMultiplicand').value,
                      "tOutput");
    });
    $("#firstMultiplicand").change(function() {
        var value = this.value;
        $("#fMultiplicandSlider").slider("value",value);
        generateTable(document.getElementById('firstMultiplier').value,
                      document.getElementById('lastMultiplier').value,
                      value,
                      document.getElementById('lastMultiplicand').value,
                      "tOutput");
    });
    $("#lastMultiplicand").change(function() {
        var value = this.value;
        $("#lMultiplicandSlider").slider("value",value);
        generateTable(document.getElementById('firstMultiplier').value,
                      document.getElementById('lastMultiplier').value,
                      document.getElementById('firstMultiplicand').value,
                      value,
                      "tOutput");

    });
});

/*
This function is what removes the tabs from the saved table section.
It essentially is just a check of what number the count is for the index and deletes it according to whats entered.
*/
(function($){
    $("#tableTab").tabs();
    $("#removeTabs").click(function() {
        var tabIndex = parseInt($("#indexValue").val(), 10);
        if(tabIndex > 0)
        {
            var tab = $( "#tableTab" ).find(".ui-tabs-nav li:eq(" + tabIndex + ")").remove();
            $("#tableTab").tabs("refresh");
        }
    });
    $("#removeAllTabs").click(function() {
        var tabCount = $('#tableTab >ul >li').length;
        var i;
        console.log(tabCount);
        /*
        I had to do some research for this to work correctly, so the idea is going forward and deleting doesn't work so you need to get a total count of tabs and delete them
        going backwards.  Almost like clearing out an array or list.
        */
        for(i = Number(tabCount) ; i > 0; i--)
        {
           var tab = $( "#tableTab" ).find(".ui-tabs-nav li:eq(" + i + ")").remove();
        }
        $("#tableTab").tabs("refresh");
    });
    /*
    When the Save Table button is clicked the table is stored into a new tab and you can click on the tab to see the table again.
    */
    $("#save").click(function() {
        var t = $("#tableTab").tabs();
        var ul = t.find("ul");
        var tabName = "[" + document.getElementById('firstMultiplier').value + " , " +
                    document.getElementById('lastMultiplier').value + "] X [" +
                    document.getElementById('firstMultiplicand').value + " , " +
                    document.getElementById('lastMultiplicand').value + "]";

        $( "<li><a href='#tab" + count + "'>" + tabName + "</a></li>" ).appendTo( ul );
        $( "<div id='tab" + count + "'><table id=table"+count+"></table> </div>" ).appendTo( t );
        t.tabs( "refresh" );
        generateTable(document.getElementById('firstMultiplier').value,
                      document.getElementById('lastMultiplier').value,
                      document.getElementById('firstMultiplicand').value,
                      document.getElementById('lastMultiplicand').value,
                      "table"+count);
        count++;
    });
 })(jQuery);

 /*
 This jQuery function sets rules for the user input on the form to make sure there is an entry and it is a digit between 1 and 100.
 If the rules specified are not followed it displays an error message.
 */
$(function () {
    $("form[name='userForm']").validate({
        rules: {
            firstMultiplier: {
                required: true,
                step: 1,
                range: [1,100]
            },
            lastMultiplier: {
                required: true,
                step: 1,
                range: [1,100]
            },
            firstMultiplicand: {
                required: true,
                step: 1,
                range: [1,100]
            },
            lastMultiplicand: {
                required: true,
                step: 1,
                range: [1,100]
            }
        },
        messages: {
            firstMultiplier: {
              required: "<br><h3>Error: User cannot leave this value blank!</h3>",
              range: "<br><h3>Number must be between 1 and 100!</h3></br>",
              step: "<br><h3>Error: Value must be a number!</h3>"
            },
            lastMultiplier: {
              required: "<br><h3>Error: User cannot leave this value blank!</h3>",
              range: "<br><h3>Number must be between 1 and 100!</h3></br>",
              step: "<br><h3>Error: Value must be a number!</h3>"
            },
            firstMultiplicand: {
              required: "<br><h3>Error: User cannot leave this value blank!</h3>",
              range: "<br><h3>Number must be between 1 and 100!</h3></br>",
              step: "<br><h3>Error: Value must be a number!</h3>"
            },
            lastMultiplicand: {
              required: "<br><h3>Error: User cannot leave this value blank!</h3>",
              range: "<br><h3>Number must be between 1 and 100!</h3></br>",
              step: "<br><h3>Error: Value must be a number!</h3>"
            }
        }
    });
});
