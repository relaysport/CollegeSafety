let entries = [{
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

let filteredEntries = entries;

function dropDown() {
    let cityDD = document.getElementById("cityDropDown");
    cityDD.innerHTML = "";
    
    let curEntries = JSON.parse(localStorage.getItem("entriesArray")) || entries;

    let distinctEntries = [...new Set(curEntries.map(entry => entry.city))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="clearFunction()" data-string="Choose stats by city">Choose to reset table</a>';
    let resultHTML = "";

    for (i = 0; i < distinctEntries.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEntries(this)" data-string="${distinctEntries[i]}">${distinctEntries[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    cityDD.innerHTML = resultHTML;
    displayData();
}

function getEntries(element) {
    let city = element.getAttribute("data-string");
    curEntries = JSON.parse(localStorage.getItem("entriesArray")) || entries;
    filteredEntries = curEntries;

    document.getElementById("buttonName").innerHTML = `${city}`;

    if (city != "All") {
        filteredEntries = curEntries.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }
    displayStats();
}

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

    for (i = 0; i < filteredEntries.length; i++) {
        totalObject = filteredEntries[i].crime_capita;
        total += totalObject;

        if (most < totalObject) {
            most = totalObject;
        }

        if (least > totalObject || least < 0) {
            least = totalObject;
        }
    }

    average = total / filteredEntries.length;

    document.getElementById("totalHighest").innerHTML = most.toLocaleString();
    document.getElementById("totalLowest").innerHTML = least.toLocaleString();
    document.getElementById("totalAverage").innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    for (i = 0; i < filteredEntries.length; i++) {
        violentObject = filteredEntries[i].violent_capita;
        total1 += violentObject;

        if (most1 < violentObject) {
            most1 = violentObject;
        }

        if (least1 > violentObject || least1 < 0) {
            least1 = violentObject;
        }
    }

    average1 = total1 / filteredEntries.length;

    document.getElementById("violentHighest").innerHTML = most1.toLocaleString();
    document.getElementById("violentLowest").innerHTML = least1.toLocaleString();
    document.getElementById("violentAverage").innerHTML = average1.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    for (i = 0; i < filteredEntries.length; i++) {
        propertyObject = filteredEntries[i].property_capita;
        total2 += propertyObject;

        if (most2 < propertyObject) {
            most2 = propertyObject;
        }

        if (least2 > propertyObject || least2 < 0) {
            least2 = propertyObject;
        }
    }

    average2 = total2 / filteredEntries.length;

    document.getElementById("propertyHighest").innerHTML = most2.toLocaleString();
    document.getElementById("propertyLowest").innerHTML = least2.toLocaleString();
    document.getElementById("propertyAverage").innerHTML = average2.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function clearFunction() {
    document.getElementById("propertyHighest").innerHTML = "";
    document.getElementById("propertyLowest").innerHTML = "";
    document.getElementById("propertyAverage").innerHTML = "";
    document.getElementById("violentHighest").innerHTML = "";
    document.getElementById("violentLowest").innerHTML = "";
    document.getElementById("violentAverage").innerHTML = "";
    document.getElementById("totalHighest").innerHTML = "";
    document.getElementById("totalLowest").innerHTML = "";
    document.getElementById("totalAverage").innerHTML = "";
}

function displayData() {
    let template = document.getElementById("entryData-template");
    let entryBody = document.getElementById("entryBody");

    entryBody.innerHTML = "";

    let curEntries = JSON.parse(localStorage.getItem("entriesArray")) || [];

    if (curEntries.length == 0) {
        curEntries = entries;
        localStorage.setItem("entriesArray", JSON.stringify(curEntries));
    }

    for (i = 0; i < curEntries.length; i++) {

        const entryRow = document.importNode(template.content, true);

        entryCols = entryRow.querySelectorAll("td");
        
        entryCols[0].textContent = curEntries[i].city;
        entryCols[1].textContent = curEntries[i].crime_capita;
        entryCols[2].textContent = curEntries[i].violent_capita;
        entryCols[3].textContent = curEntries[i].property_capita;
        entryCols[4].textContent = curEntries[i].year;
        
        entryBody.appendChild(entryRow);
    }

}

function saveEntryData() {
    let curEntries = JSON.parse(localStorage.getItem("entriesArray")) || entries;

    let obj = {};

    obj["city"] = document.getElementById("newEntryCity").value;
    obj["crime_capita"] = parseInt(document.getElementById("newEntryTotal").value, 10);
    obj["violent_capita"] = parseInt(document.getElementById("newEntryViolent").value, 10);
    obj["property_capita"] = parseInt(document.getElementById("newEntryProperty").value, 10);
    obj["year"] = document.getElementById("newEntryYear").value;

    curEntries.push(obj);

    localStorage.setItem("entriesArray", JSON.stringify(curEntries));

    dropDown();
    displayData();
}

function getWord() {

    let city = document.getElementById("newEntryCity").value;
    let total = document.getElementById("newEntryTotal").value;
    let violent = document.getElementById("newEntryViolent").value;
    let property = document.getElementById("newEntryProperty").value;
    let year = document.getElementById("newEntryYear").value;

    let errorState = false;
    let errorMsg = "";
    let isPal = false;

    if (city == "") {
        errorMsg += "You have to type something in!";
    } else if (total == "") {
        errorMsg += "You have to type something in!";
    } else if (year = "") {
        errorMsg += "You have to type something in!";
    } else if (violent = "") {
        errorMsg += "You have to type something in!";
    } else if (property = "") {
        errorMsg += "You have to type something in!";
    } else {
        isPal = true;
    }

    if (!isPal) {
        Swal.fire(
            'Sorry!',
            `${errorMsg}`,
            'error'
        );
        return;
    } else {
        Swal.fire(
            'Congratulations!',
            'You have entered the data',
            'success'
        );
        return;
    }
};