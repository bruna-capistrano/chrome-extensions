var googleSearch = "https://www.google.com/search?q="
var searchTerms = "o efeito do consumo de café"

function pad(value) {
  value = (value > 9) ? value : "0" + value;
  return String(value);
}

function timeStamp() {
  var currentTime = new Date();
  var datestr = currentTime.getFullYear() + "" + pad(currentTime.getMonth() + 1 ) + ""+ pad(currentTime.getDate());
  var timestr = pad(currentTime.getHours()) + "" + pad(currentTime.getMinutes()) + "" + pad(currentTime.getSeconds()) + "" + pad(currentTime.getMilliseconds());
  return datestr + timestr;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
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
                  'subject': 'perform_search',
                },
                function(response){ // With data obj returned from content.js
                  console.log("response received from content script has ", response.sers.length, " elements");

                  chrome.runtime.sendMessage({"subject": "update_popup", "sers": response.sers})

                  chrome.identity.getProfileUserInfo(function (userProfile) {

                    var uid = userProfile.id;
                    var ts  = timeStamp();
                    var fileName = uid + "_" + ts + '.json';

                    donation = JSON.stringify({
                      uid : uid,
                      ts  : ts,
                      searchTerms   : searchTerms,
                      searchResults : response.sers
                      });

                    // Creates a new instance of the Github object exposed by Github.js
                    //var GitHub = require('./github');
                    var github = new Github({
                      username: 'webmedia2019mc2',
                      password: 'WebMedia2019',
                      auth: 'basic'
                    });

                    // Creates an object representing the repository you want to work with
                    var repository = github.getRepo('webmedia2019mc2', 'donateyourdata');

                    // Creates a new file (or updates it if the file already exists)
                    // with the content provided
                    repository.write(
                       'master',
                       fileName, // e.g. 'blog/index.md'
                       donation,
                       'Donation added',
                       function(err) {}
                    );

                    //chrome.tabs.remove(tab.id);

                  });

                }
              );
            }
          }
        )
      })
    }
  }
);
