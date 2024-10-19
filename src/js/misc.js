document.getElementById("myCheckbox").addEventListener("change", switchMode);
function applyDark() {
    $("#wrapper").addClass("wrapper_dark");
    $("#wrapper").removeClass("wrapper_light");

    $("textarea").addClass("text_dark_mode");
    $("footer").addClass("footer_dark");
}

function applyLight() {
    $("#wrapper").addClass("wrapper_light");
    $("#wrapper").removeClass("wrapper_dark");
    $("textarea").removeClass("text_dark_mode");
    $("footer").removeClass("footer_dark");
}

function switchMode() {

    if (document.getElementById("myCheckbox").checked === true) {
        // changeCSS('/css/main_dark.css', 2);
        applyDark()
        localStorage.setItem("modePrefLS", "dark");

    } else {
        // changeCSS('/css/main.css', 2);
        applyLight()
        localStorage.setItem("modePrefLS", "light");
    }

}


function loadModePref() {

    console.log(localStorage.getItem("modePrefLS") + " mode loaded");
    var modeLoad = localStorage.getItem("modePrefLS");

    if (modeLoad === "light" || modeLoad === null) {

        applyLight()
        document.getElementById("myCheckbox").checked = false;
    }
    else {

        applyDark()
        document.getElementById("myCheckbox").checked = true;
    }
}

loadModePref();



$("#add_draft").click(function () {
    var new_draft = "শুন্য ড্রাফট ";
    if (new_draft) {
        var new_draft_html =
            '<li><a href="#">' + new_draft + "</a></li>";
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
            '<li><a href="#">-</a></li>';
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
                $("#copy-btn").html("লেখা কপি করুন");
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
});

$("#pop-btn").on("click", function () {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup"
    });
})