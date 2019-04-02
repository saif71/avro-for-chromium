function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function switchMode() {

    if (document.getElementById("myCheckbox").checked === true) {
        changeCSS('css/main_dark.css', 1);
        localStorage.setItem("modePrefLS", "dark");

    } else {
        changeCSS('css/main.css', 1);
        localStorage.setItem("modePrefLS", "light");
    }

}
function loadModePref() {

    console.log(localStorage.getItem("modePrefLS")+ " mode loaded");
    
    var modeLoad = localStorage.getItem("modePrefLS");

    if (modeLoad === "light" || modeLoad === null) {

        changeCSS('css/main.css', 1);
        document.getElementById("myCheckbox").checked = false;
    }
    else {

        changeCSS('css/main_dark.css', 1);
        document.getElementById("myCheckbox").checked = true;
    }
}

loadModePref();
