async function showCookiesForTab(tabs) {

  let tab = tabs.pop();


  const itens = await browser.tabs.sendMessage(
  tab.id,
  {method: "cookie-list"}
  )

  //Pega os cookies
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {

    var tabName = document.getElementById('header-title');
    var tabURL = document.getElementById('url');
    var numCookies = document.getElementById('number-cookies');
    var cookieList = document.getElementById('cookie-list');
    var cookieListSize = document.getElementById('cookie-list-size');

    //URL da pagina
    let currURL = document.createTextNode(tab.url);
    let urlP = document.createElement("p");
    urlP.appendChild(currURL);
    tabURL.appendChild(urlP);

    //Quantidade de cookies e titulo da pagina
    var text = document.createTextNode(tab.title);
    let content = document.createTextNode("Number of cookies: " + cookies.length);
    let p = document.createElement("p");
    p.appendChild(content);
    numCookies.appendChild(p);
    tabName.appendChild(text);

    if(cookies.length == 0){
      numCookies.style.color = "blue";
    }
    else if(cookies.length < 2){
      numCookies.style.color = "orange";
    }else{
      numCookies.style.color = "red";
    }

    //lista de cookies
    if (cookies.length > 0) {
      let total = 0;
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        cookieList.appendChild(li);
        total += cookie.name.length;
        total += cookie.value.length;
      }

      //Tamanho total
      var cookieSize = document.createTextNode(`Total Cookie Size: ${total} (Bytes)`);
      let cookieSizeP = document.createElement("p");
      cookieSizeP.appendChild(cookieSize);
      cookieListSize.appendChild(cookieSizeP);
    }
  });
}

    
    
async function showLocalStorage(tabs){
    
  let tab = tabs.pop();

    var localstorage = document.getElementById('localstorage');
    var localstorageSize = document.getElementById('localstorage-size');

    const storage = await browser.tabs.sendMessage(
    tab.id,
    {method: "localstorage"}
  )

  //lista de local storage
  let total = 0;
  let storageSizeP = document.createElement("p");
  if (storage.data.length > 0) {
    for (let item of storage.data) {
      if (item != undefined) {
        let li = document.createElement("li");
        let content = document.createTextNode(item);
        li.appendChild(content);
        localstorage.appendChild(li);
        total += 1;
      }
    }
  }
  let storageSize = document.createTextNode(`Total Local Storage: ${total}`);
  storageSizeP.appendChild(storageSize);
  localstorageSize.appendChild(storageSizeP);
  if(total == 0){
    localstorageSize.style.color = "blue";
  }
  else if(total < 2){
    localstorageSize.style.color = "orange";
  }
  else{
    localstorageSize.style.color = "red";
  }
}
    
async function showSessionStorage(tabs){
    
  let tab = tabs.pop();

    var sessionstorage = document.getElementById('sessionstorage');
    var sessionStorageSize = document.getElementById('sessionstorage-size');


    const itens = await browser.tabs.sendMessage(
    tab.id,
    {method: "sessionstorage"}
  )
  
  //lista de session storage
  let total = 0;
  let storageSizeP = document.createElement("p");
  if (itens.data.length > 0) {
    for (let item of itens.data) {
      if (item != undefined) {
        let li = document.createElement("li");
        let content = document.createTextNode(item);
        li.appendChild(content);
        sessionstorage.appendChild(li);
        total += 1;
      }
    }
  }
  let storageSize = document.createTextNode(`Total Session Storage: ${total}`);
  storageSizeP.appendChild(storageSize);
  sessionStorageSize.appendChild(storageSizeP);
  if(total == 0){
    sessionStorageSize.style.color = "blue";
  }
  else if(total < 2){
    sessionStorageSize.style.color = "orange";
  }
  else{
    sessionStorageSize.style.color = "red";
  }
}
    
    
async function showExternalConnections(tabs){
    
  let tab = tabs.pop();

  var conn = document.getElementById('3rd');
  var connNum = document.getElementById('number-3rd');

  const itens = await browser.tabs.sendMessage(
    tab.id,
    {method: "external"}
  )

  // URL para comparacao
  let currURL = tab.url.split('.')[0];
  
  //Lista das conexoes externas
  let numExtConn = 0;
  if (itens.data.length > 0) {
    for (let item of itens.data) {
      if (item != "") {
        let dom = item.split('.')[0];
        if(dom != currURL){
          let li = document.createElement("li");
          let content = document.createTextNode(item);
          li.appendChild(content);
          conn.appendChild(li);
          numExtConn++;
        }
      }
    }
  }
  let extConnNum = document.createTextNode("3rd party connections: " + numExtConn);
  let extConnNumP = document.createElement("p");

  extConnNumP.appendChild(extConnNum);
  connNum.appendChild(extConnNumP);
  if(numExtConn == 0){
    connNum.style.color = "blue";
  }
  else if(numExtConn < 2){
    connNum.style.color = "orange";
  }
  else{
    connNum.style.color = "red";
  }
}

function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}

getActiveTab().then(showCookiesForTab) 
getActiveTab().then(showExternalConnections)
getActiveTab().then(showLocalStorage) 
getActiveTab().then(showSessionStorage) 