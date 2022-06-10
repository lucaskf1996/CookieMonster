browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === "external"){
        let teste = sendResponse({data: urls});
        console.log(teste);
    }
    else if (request.method === "localstorage"){
        sendResponse({data: Object.entries(localStorage)})
    }
    else if (request.method === "sessionstorage"){
        sendResponse({data: Object.entries(sessionStorage)})
    }
    else if(request.method === "cookie-list"){
        sendResponse({data: Object.entries(sessionStorage)})
    }
    return true
});
  

var urls = Array.prototype.map.call(
    document.querySelectorAll("link, img, script, iframe"), // Elements which request external resources
    function(e) { // Loop over and return their href/src
        return e.href || e.src; 
    }
);