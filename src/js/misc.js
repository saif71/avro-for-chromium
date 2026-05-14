document.getElementById("myCheckbox").addEventListener("change", switchMode);

function applyDark() {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
}

function applyLight() {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
}

function switchMode() {
  if (document.getElementById("myCheckbox").checked === true) {
    applyDark();
    localStorage.setItem("modePrefLS", "dark");
  } else {
    applyLight();
    localStorage.setItem("modePrefLS", "light");
  }
}

function loadModePref() {
  var modeLoad = localStorage.getItem("modePrefLS");
  if (modeLoad === "dark") {
    applyDark();
    document.getElementById("myCheckbox").checked = true;
  } else {
    applyLight();
    document.getElementById("myCheckbox").checked = false;
  }
}

loadModePref();



$("#add_draft").click(function () {
    var new_draft = "শুন্য ড্রাফট ";
    if (new_draft) {
        var new_draft_html =
          '<li><a href="#">' +
          new_draft +
          '</a><button class="delete-draft" title="ড্রাফট মুছুন">&times;</button></li>';
        $(".drafts ul").append(new_draft_html);

    }
});


function addDraftsFromLocalStorage() {
    var draftKeys = [];
    for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        if (key.indexOf("draft-") === 0) {
            draftKeys.push(key);
        }
    }
    for (var i = 0; i < draftKeys.length - 1; i++) {
        var new_draft_html =
          '<li><a href="#">-</a><button class="delete-draft" title="ড্রাফট মুছুন">&times;</button></li>';
        $(".drafts ul").append(new_draft_html);
    }
    document.getElementById("draft_count").innerHTML = draftKeys.length;
}

addDraftsFromLocalStorage();

$("#copy-btn").click(function () {
    var copyText = document.querySelector("textarea");
    copyText.select();
    navigator.clipboard.writeText(copyText.value)
        .then(() => {
            $(this).html("✅ কপি হয়েছে");
            setTimeout(function () {
                $("#copy-btn").html("কপি");
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
});

var pinSidebarBtn = document.getElementById("pin-sidebar-btn");
if (pinSidebarBtn) {
    pinSidebarBtn.addEventListener("click", function () {
        chrome.runtime.sendMessage({ action: "openSidePanel" });
        window.close();
    });
}
(function () {
  var mode = localStorage.getItem("modePrefLS");
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.add("light");
  }
})();