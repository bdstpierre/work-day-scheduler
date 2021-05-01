// References to import DOM elements
var dateDisplayEl = document.querySelector('#currentDay');
var timeBlocks = document.querySelector('.container');
var saveEl;

var hours = [9, 10, 11, 12, 13, 14, 15, 16 ,17];
var theHour = [];
var theTime = [];
var theDescription = [];
var theSave = [];
var appointmentText = [];

// Appointment Object
var appointmentList = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
}

function getLocalStorage(){
    // We want to get the appointments from teh lcoal storage, if there are any
    // This also populates the data object
    appointmentList = JSON.parse(localStorage.getItem("appointmentList"));
    if (appointmentList !== null) {
        // appDesc holds all of the divs with the class of "description"
        var appDesc = document.querySelectorAll('.description');
        // Add the data to the schedule
        for (var i = 0; i < hours.length; i++) {
            // The only child of these particular divs are the <textarea> elements
            appDesc[i].children[0].value = appointmentList[hours[i]]; 
        }
    }
}

// Handle the display of the date
function displayDate() {
    var today = moment().format('dddd, MMMM Do');

    dateDisplayEl.textContent = today;
}

// Add time blocks for 9:00 am to 5:00 pm
function addTimeBlocks() {
    tableResp = document.createElement("div");
    $(tableResp).addClass("table-responsive");
    dateTable = document.createElement("div");
    $(dateTable).addClass("table");

    // For each "row" in the schedule, create divs for the row
    for (var i=0; i < hours.length; i++) {
        theHour[i] = document.createElement("div");
        $(theHour[i]).addClass("row");
        $(theHour[i]).attr("data-time", hours[i]);
    
        // Create divs for the time
        theTime[i] = document.createElement("div")
        $(theTime[i]).text(moment(hours[i], 'H').format('hA'));
        
        // Create divs and textareas for the appointment text
        theDescription[i] = document.createElement("div");
        appointmentText[i] = document.createElement("textarea");
        // While creating these divs, lets set the shading so we can 
        // use a larger interval step for updating the shading later
        var currentHour = moment().format("H");
        if ( hours[i] < currentHour){
            $(theDescription[i]).addClass("past");
        } else if (hours[i] > currentHour) {
            $(theDescription[i]).addClass("future");
        } else {
            $(theDescription[i]).addClass("present");
        }
        theDescription[i].append(appointmentText[i]);

        // Create divs for the save button and add a listener for the button click
        theSave[i] = document.createElement("div");
        $(theSave[i]).text("💾");
        theSave[i].addEventListener('click', handleSaveData);

        // Append all the children to the row div
        theHour[i].append(theTime[i], theDescription[i], theSave[i]);
        // Append the row to the table
        dateTable.append(theHour[i]);
    }

    // Set the classes for the various elements that are common across al the hours
    $(theTime).addClass("hour col-2 text-center");
    $(theDescription).addClass("description col-8");
    $(appointmentText).attr("type", "text");
    $(theSave).addClass("saveBtn col-1 text-center");

    // Append the table to its parent table
    tableResp.append(dateTable);
    // Append the table to the timeBlocks container
    timeBlocks.append(tableResp);

}

// Set up an interval timer ot update the shading on the cells every minute
var hourTimer = setInterval(shadeHours,60000);

// Function for updating the shading on the cells
function shadeHours() {
    var currentHour = moment().format("H");

    // Iterate over all the hours in the schedule
    for(var i = 0; i < hours.length; i++) {

        // If the hour in the schedule is earlier than the current hour update the class to "past" 
        if ( hours[i] < currentHour){
            // If it contains "future", replace "future" with "past"
            if(theDescription[i].classList.contains("future")){
                theDescription[i].classList.replace("future", "past");
            // If it contains "present", replace "present" with "past"
            } else if (theDescription[i].classList.contains("present")) {
                theDescription[i].classList.replace("present", "past");
            }
            // If it contains "past" we are all set so we do nothing
        // If the hour in the schedule is the same as the current hour update the class to "present"
        } else if (hours[i] == currentHour) {
            // If it contains "future", replace "future" with "present"
            if(theDescription[i].classList.contains("future")){
                theDescription[i].classList.replace("future", "present");
            // If it contains "past", replace "past" with "present"
            } else if (theDescription[i].classList.contains("past")) {
                theDescription[i].classList.replace("past", "present");
            }
            // If it contains "present" we are all set so we do nothing
        // Otherwise, the hour on the schedule is in the future
        } else {
            // If it contains "past", replace "past" with "future"
            if(theDescription[i].classList.contains("past")){
                theDescription[i].classList.replace("past", "future");
            // If it contains "present", replace "present" with "future"
            } else if (theDescription[i].classList.contains("present")) {
                theDescription[i].classList.replace("present", "future");
            }
            // If it contains "future" we are all set so we do nothing
        }
    }

}

// Save the data when the user clicks the save button
function handleSaveData(event) {
    // Get the data from the cells  
    // the row div has a data-time attribute set to the hour that row represents
    var objectKey = event.target.parentElement.dataset.time;
    // This commands gets the data that was entered into the textarea field
    var objectValue = event.target.parentElement.children[1].children[0].value;

    // The individual data is added to the data object
    appointmentList[objectKey] = objectValue;

    // The data object is stringified and saved to local storage
    localStorage.setItem("appointmentList", JSON.stringify(appointmentList));

}

// Display the header and date
displayDate();

// Add the time blocks to the page
addTimeBlocks();

// Get any data form local storage and populate the calendar.
// [Should add an alert to ask what to do if the data is from a previous day]
getLocalStorage();

