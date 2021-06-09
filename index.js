console.log("this is post-master tut");


// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize number of parameters
let addParamCount = 0;

let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = "none";

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parameterBox').style.display = "block";

});


let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "block";
    document.getElementById('parameterBox').style.display = "none";

});

// If the users clicks on + button, add more parameters

let addParam = document.getElementById('addParams');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-3">
                    <legend class="col-form-label col-sm-2">Parameter ${addParamCount + 2}</legend>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Value">
                    </div>
               
                        <button class="ml-4 col-md-1 btn btn-dark deleteParam"> -</button>
               
                    </div>`;

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            if (confirm("Are you sure, You want to delete")) {
                e.target.parentElement.remove();
            }
        })
    }
    addParamCount++;
});


// If the user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";



    // Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // if user has params option instead of Json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
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

    // Log all the value in the console for debugging 
    console.log('URL is', url);
    console.log('RequestType is', requestType);
    console.log('ContentType is', contentType);
    console.log("this is data", data);



    // if the request type id get, invoke fetch api to create a post request

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
            })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }





});