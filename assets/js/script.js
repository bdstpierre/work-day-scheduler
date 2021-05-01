// References to import DOM elements
var dateDisplayEl = $('#currentDay');
var timeBlocks = $('.container');

var hours = [9, 10, 11, 12, 13, 14, 15, 16 ,17];
var theHour = [];
var theTime = [];
var theDescription = [];
var theSave = [];




// Handle the display of the date
function displayDate() {
    var today = moment().format('dddd, MMMM Do');

    dateDisplayEl.text(today);
}

// Add time blocks for 9:00 am to 5:00 pm
function addTimeBlocks() {
    tableResp = document.createElement("div");
    console.log(tableResp);
    $(tableResp).addClass("table-responsive");
    dateTable = document.createElement("table");
    $(dateTable).addClass("table");

    for (var i=0; i < hours.length; i++) {
        console.log(hours[i]);
        theHour[i] = document.createElement("tr");
        $(theHour[i]).addClass("row");
    
        theTime[i] = document.createElement("td")
        $(theTime[i]).addClass("hour");
        $(theTime[i]).text(moment(hours[i], 'H').format('hA'));

        theDescription[i] = document.createElement("td");
        $(theDescription[i]).addClass("description");

        theSave[i] = document.createElement("tr");
        $(theSave[i]).addClass("saveBtn");
        $(theSave[i]).text("💾");

        theHour[i].append(theTime[i], theDescription[i], theSave[i]);
        dateTable.append(theHour[i]);
    }

    tableResp.append(dateTable);

    timeBlocks.append(tableResp);
    
}



// setInterval(displayDate,1000);
displayDate();
console.log(hours.length);
addTimeBlocks();