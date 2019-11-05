var googleSearch = "https://www.google.com/search?q=";
var searchTerms = "o efeito do consumo de café";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //throw "FakeError";
    if(request.subject == "request_content"){

      searchUrl = googleSearch + searchTerms;

      chrome.tabs.create({
        url: searchUrl,
        active: false
      },
      function(tab) { // With newly opened tab
        chrome.tabs.onUpdated.addListener( // Add event listener to new tab
          function func(tabId, changeInfo) { // Wait for tab to load
            if (tabId == tab.id && changeInfo.status == 'complete') {
              chrome.tabs.onUpdated.removeListener(func);
						  chrome.tabs.sendMessage(tab.id,
						    { // Message content.js to grab DOM from opened tab
						      'subject': 'parsing_search_results'
						    },
						    function(response){ // With data obj returned from content.js
						    	console.log("response received from content script has ", response.sers.length, " elements");
						      chrome.runtime.sendMessage({"subject": "updating_popup", "sers": response.sers})
						      //chrome.tabs.remove(tab.id);
						    }
						  );
            }
          }
        )
      })
    }
  }
);


