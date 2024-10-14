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

var draft_count = 5;

$("#add_draft").click(function () {
    var new_draft = "Empty Draft " + (draft_count + 1);
    if (new_draft) {
        var new_draft_html =
            '<li><a href="#">' + new_draft + "</a></li>";
        $(".drafts ul").append(new_draft_html);
        draft_count++;
    }
});
