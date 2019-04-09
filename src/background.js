// //chrome.browserAction.setBadgeText({text: "10+"});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "bn_enable"){
        sendResponse({farewell: "BN Enabled"});
        chrome.browserAction.setBadgeText({text: "BN"});
    }

    else if (request.avc_mode == "en_enable"){
        sendResponse({farewell: "English Enabled"});
        chrome.browserAction.setBadgeText({text: ""});
    }
    });