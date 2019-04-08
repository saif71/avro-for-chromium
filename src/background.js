// //chrome.browserAction.setBadgeText({text: "10+"});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "bn_enable"){
        sendResponse({farewell: "Bangla Enabled"});
        chrome.browserAction.setBadgeText({text: "EN"});}

    else{
        sendResponse({farewell: "English Enabled"});
        chrome.browserAction.setBadgeText({text: "BN"});
    }
    });