console.log('This is my project 6 from JavaScript course');
/*
0. containerForHeading = Class is Only For Heading
1. container =  Class of all of our container in which all of elements gets displayed

1.1 urlField = ID of our URL block (in which we paste url of our Request)
1.2 requestTypeBox = Id of Block container option for GET/POST request
/// 1.2.1 get = ID of our GET request elements 
/// 1.2.2 post = ID of our POST request elements 
1.3 containerTypeBox = Id of Block where we put our Radio switches of JSON/Custom-Parameters
/// 1.3.1 jsonRadio = ID of our JSON block inside contentTypeBox 
/// 1.3.2 paramsRadio = ID of our Custom-Parameter block inside contentTypeBox 
1.4 Container in which our json/Custom-Parameter we be plotted
/// 1.4 1. parameterBox = Id of our Parameter box , which will hide on Selecting JSON option in Content Box
/// / 1.4.1.1 parameterKey1 = ID of our Parameter Key Inside Parameter Box
/// / 1.4.1.2 parameterValue1 = ID of our Parameter Value Inside Parameter Box
/// / 1.4.1.3 addParam = Id of + symbol which on be clicked run params
/// / 1.4.1.4 params = ID for adding all new Created Parameters in a Row
/// 1.4 2. jsonRequestBox = Id of element contain , which will hide on Clicking Parameters option in Content Type
/// / 1.4.2.1 requestJsonText = Id of our TextARea where we submit our Json Request 
1.5 submit = ID of our Submit Button
1.6 responseJsonBox = ID of our Element inside which our JSON Result will Display 
1.6.1 responseJsonText = ID of TextAREA where our JSON Result will Displayed 

*/

// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize no of parameters
let addedParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            let confirmResult = confirm("Want to delete?");
            if (confirmResult) {
                //Logic to delete the item
                e.target.parentElement.remove();
                // e.target-- Button on which we clicked , .parentElement -- parent element with added strings, .remove -- FOR removing 
            };
        });
    };
    addedParamCount++;
})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
                method: 'GET',
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    } else {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });

    }


});