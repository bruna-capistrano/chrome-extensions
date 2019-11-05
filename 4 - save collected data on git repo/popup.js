// acknowledge Robertson
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Codigo modificado para Minicurso 2 do Webmedia 2019

document.addEventListener('DOMContentLoaded', function () {
	chrome.runtime.sendMessage({"subject": "request_content"}); 
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.subject == "update_popup"){
    	buildPopupDom("res_div", request.sers)
		}
	}
);

function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById(divName);

  var ul = document.createElement('ul');
  popupDiv.appendChild(ul);

  for (var i = 0, ie = data.length; i < ie; ++i) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(data[i]));
    ul.appendChild(li);
  }
};
