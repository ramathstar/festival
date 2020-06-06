var nightModeToggler = document.querySelector(`#nightModeTogglerWrapper`);
var largeFontButton = document.querySelector("#largeFont");
var mediumFontButton = document.querySelector("#mediumFont");
var defaultFontButton = document.querySelector("#defaultFont");
var fontSizeDropDownMenu = document.querySelector("#fontSizeDropDownMenu");
var nightModeInput = document.querySelector("#nightModeToggler");
var headingColorPicker = document.querySelector("#headingColorPicker");
var resetSettingsBtn = document.querySelector("#resetSettingsBtn");

nightModeToggler.addEventListener("click", function(e) {
  if (localStorage.getItem("nightmode")) {
    localStorage.removeItem("nightmode");
    window.location.reload();
  } else {
    nightModeInput.checked = true;
    localStorage.setItem("nightmode", true);
    setNightMode(localStorage.getItem("nightmode"));
  }
  console.log(localStorage);
});

headingColorPicker.addEventListener("change", function(event) {
  var newColor = event.target.value;
  if (newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    headingColorPicker.value = newColor;
    localStorage.setItem("preferdColor", newColor);
    setPreferedColor(newColor);
  }
  console.log(localStorage);
});

largeFontButton.addEventListener("click", () => setFontSizeHelper(4.5));
mediumFontButton.addEventListener("click", () => setFontSizeHelper(3));
defaultFontButton.addEventListener("click", () => setFontSizeHelper(2.5));

resetSettingsBtn.addEventListener("click", e => {
  localStorage.clear();
  window.location.reload();
});
