let button = document.getElementById('save_button');
button.addEventListener('click', function() {
  var userToken = document.getElementById('user_token').value;

  chrome.storage.local.get(["userToken"], function(result) {
    if(userToken) {
      chrome.storage.local.set({"userToken": userToken}, function() {
        console.log('User token is now set to |' + userToken + '|.');
      })
    }
  })
});

// updates option page with current user token
chrome.storage.local.get(["userToken"], function(result) {
  document.getElementById('user_token').value = result["userToken"];
})