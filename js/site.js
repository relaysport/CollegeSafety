// declare onload data input

let events = [{
        city: "Memphis",
        crime_capita: 8029,
        violent_capita: 1901,
        property_capita: 6128,
        year: 2019
    },

    {
        city: "Memphis",
        crime_capita: 8349,
        violent_capita: 1943,
        property_capita: 6406,
        year: 2018
    },

    {
        city: "Memphis",
        crime_capita: 8301,
        violent_capita: 2003,
        property_capita: 6298,
        year: 2017
    },

    {
        city: "Detroit",
        crime_capita: 6268,
        violent_capita: 1965,
        property_capita: 4303,
        year: 2019
    },

    {
        city: "Detroit",
        crime_capita: 6313,
        violent_capita: 2008,
        property_capita: 4305,
        year: 2018
    },

    {
        city: "Detroit",
        crime_capita: 6598,
        violent_capita: 2057,
        property_capita: 4541,
        year: 2017
    },

    {
        city: "Irvine",
        crime_capita: 1370,
        violent_capita: 64,
        property_capita: 1306,
        year: 2019
    },

    {
        city: "Irvine",
        crime_capita: 1326,
        violent_capita: 56,
        property_capita: 1270,
        year: 2018
    },

    {
        city: "Irvine",
        crime_capita: 1377,
        violent_capita: 61,
        property_capita: 1316,
        year: 2017
    },

    {
        city: "Greensboro",
        crime_capita: 4508,
        violent_capita: 819,
        property_capita: 3689,
        year: 2019
    },
];

// default display variable for all events

let filteredEvents = events;

// dropdown menu declarations for specific events

function dropDown() {
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";
    let distinctEvents = [...new Set(events.map(event => event.city))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";

    for (i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
    displayData();
}

// 

function getEvents(element) {
    let city = element.getAttribute("data-string");
    curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    filteredEvents = curEvents;

    document.getElementById("buttonName").innerHTML = `${city}`;

    if (city != "All") {
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }
    displayStats();
}

// display the stats

function displayStats() {
    let total = 0;
    let total1 = 0;
    let total2 = 0;
    let average = 0;
    let average1 = 0;
    let average2 = 0;
    let most = 0;
    let most1 = 0;
    let most2 = 0;
    let least = -1;
    let least1 = -1;
    let least2 = -1;
    let totalObject = 0;
    let violentObject = 0;
    let propertyObject = 0;

    for (i = 0; i < filteredEvents.length; i++) {
        totalObject = filteredEvents[i].crime_capita;
        total += totalObject;

        if (most < totalObject) {
            most = totalObject;
        }

        if (least > totalObject || least < 0) {
            least = totalObject;
        }
    }

    average = total / filteredEvents.length;

    document.getElementById("totalHighest").innerHTML = most.toLocaleString();
    document.getElementById("totalLowest").innerHTML = least.toLocaleString();
    document.getElementById("totalAverage").innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    for (i = 0; i < filteredEvents.length; i++) {
        violentObject = filteredEvents[i].violent_capita;
        total1 += violentObject;

        if (most1 < violentObject) {
            most1 = violentObject;
        }

        if (least1 > violentObject || least1 < 0) {
            least1 = violentObject;
        }
    }

    average1 = total1 / filteredEvents.length;

    document.getElementById("violentHighest").innerHTML = most1.toLocaleString();
    document.getElementById("violentLowest").innerHTML = least1.toLocaleString();
    document.getElementById("violentAverage").innerHTML = average1.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    for (i = 0; i < filteredEvents.length; i++) {
        propertyObject = filteredEvents[i].property_capita;
        total2 += propertyObject;

        if (most2 < propertyObject) {
            most2 = propertyObject;
        }

        if (least2 > propertyObject || least2 < 0) {
            least2 = propertyObject;
        }
    }

    average2 = total2 / filteredEvents.length;

    document.getElementById("propertyHighest").innerHTML = most2.toLocaleString();
    document.getElementById("propertyLowest").innerHTML = least2.toLocaleString();
    document.getElementById("propertyAverage").innerHTML = average2.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
// display the data after adding

function displayData() {
    let template = document.getElementById("entryData-template");
    let eventBody = document.getElementById("eventBody");

    eventBody.innerHTML = "";

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

    if (curEvents.length == 0) {
        curEvents = events;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }

    for (i = 0; i < curEvents.length; i++) {

        const eventRow = document.importNode(template.content, true);

        eventCols = eventRow.querySelectorAll("td");
        
        eventCols[0].textContent = curEvents[i].city;
        eventCols[1].textContent = curEvents[i].crime_capita;
        eventCols[2].textContent = curEvents[i].violent_capita;
        eventCols[3].textContent = curEvents[i].property_capita;
        eventCols[4].textContent = curEvents[i].year;
        
        eventBody.appendChild(eventRow);
    }

}

//

function saveEventData() {
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    let obj = {};

    obj["city"] = document.getElementById("newEntryCity").value;
    obj["crime_capita"] = document.getElementById("newEntryTotal").value;
    obj["violent_capita"] = document.getElementById("newEntryViolent").value;
    obj["property_capita"] = document.getElementById("newEntryProperty").value;
    obj["year"] = document.getElementById("newEntryYear").value;

    curEvents.push(obj);

    localStorage.setItem("eventsArray", JSON.stringify(curEvents));

    buildDropDown();
    displayData();
}

// clear inputs

function clearDataInputs() {
    let dataTable = [];

    localStorage.setItem("eventsArray", JSON.stringify(dataTable))
}