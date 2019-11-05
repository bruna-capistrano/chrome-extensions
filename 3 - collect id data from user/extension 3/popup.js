// acknowledge Robertson
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Codigo modificado para Minicurso 2 do Webmedia 2019

document.addEventListener('DOMContentLoaded', function () {
	
	chrome.storage.local.get(['userToken'], function(result) {
		chrome.identity.getProfileUserInfo(function (userProfile) {
			document.getElementById("user_id").innerHTML    = userProfile.id;
			document.getElementById("user_email").innerHTML = userProfile.email;
			document.getElementById("user_token").innerHTML = result["userToken"];
		})
	})
});