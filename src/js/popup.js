var saveButton = document.getElementById('saveButton');
var selection = document.getElementById('selection');

chrome.storage.local.get('banglaFont', function (items) {
    var matched = false;
    var opts = selection.options;
    for (var opt, j = 0; opt = opts[j]; j++) {
        if (opt.value == items.banglaFont) {
            selection.selectedIndex = j;
            matched = true;
            break;
        }
    }
    if (!matched) {
        selection.style.color = 'dimgrey';
        if (items.banglaFont) {
            customFont.value = items.banglaFont;
        }
    }
});

saveButton.addEventListener('click', function(e) {
    e.preventDefault();
    chrome.storage.local.set({ banglaFont: selection.value }, function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) { 
            chrome.tabs.executeScript(tabArray[0].id, { file: 'js/fontfix.js' }, function() {
                close();
            });
        });
    });
});