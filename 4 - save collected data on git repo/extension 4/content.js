chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  // If the received message has the expected format...
    if (request.subject === 'perform_search') {
      data = [];
      var sers = document.evaluate("//div[@class=\"srg\"]//a/h3", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i=0; i < sers.snapshotLength; i++)
			{
			  data[i] = sers.snapshotItem(i).textContent;
			}			      
      sendResponse(
        {
          "sers": data
        }
      )
    };
  }
);

