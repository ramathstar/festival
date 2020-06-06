var form = document.querySelector("#order-tickets-form");
var messageBox = document.querySelector("#message-box");

function isNotNull(data) {
  return data === null ? false : true;
}
function isTextValid(text) {
  var re = /^[a-zA-Z]+$/;
  return isNotNull(text.match(re));
}

function isEmailValid(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function isValidPhone(phone) {
  var re = /^[0-9]{8,12}$/;
  return isNotNull(phone.match(re));
}

function isBirthDateValid(birthDate) {
  var pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  if (birthDate.match(pattern)) {
    return true;
  }
  return false;
}

function isTicketQuantityValid(tickets) {
  if (tickets.match(/\b([1-9]|10)\b/)) {
    var num = Number(tickets);
    return num >= 1 && num <= 10 ? true : false;
  }
  return false;
}

function validateBirthDate(birthDate) {
  var pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  if (birthDate.match(pattern)) {
    var splited = birthDate.split("-");
    var year = Number(splited[0]);
    var month = Number(splited[1]);
    var day = Number(splited[2]);
    if (year < 1920) {
      return "Year must be higher than 1920";
    } else if (year > new Date().getFullYear()) {
      return `Your birth year cannot be ${year} because now it is ${new Date().getFullYear()}`;
    } else if (month < 1 && month > 12) {
      return `Month provided is not valid: ${month}. It must be in range of [1:12].`;
    } else if (day < 1 && day > 31) {
      return `Day provided is not valid: ${day}. It must be in range of [1:31].`;
    } else {
      return "";
    }
  } else {
    return "Birth Date cannot be empty!";
  }
}

function validateTicketQuantity(tickets) {
  if (tickets.match(/^[0-9]+$/)) {
    let count = Number(tickets);

    if (count < 1) {
      return `Ticket quantity cannot be less than 1, You want to buy: ${count}`;
    } else if (count > 10) {
      return `Maximum quantity allowed to buy for one user is 10, You want to buy: ${count}`;
    } else {
      return "";
    }
  }
  return "Ticket input can only contain numbered values, no special symbols allowed!";
}

function validatePhoneNumber(number) {
  if (number.match(/^[0-9]+$/)) {
    if (number.length < 8) {
      return "Phone number must container 8digits atleast";
    } else if (number.length > 12) {
      return "Phone number can only contain maximum of 12 digits";
    } else {
      return "";
    }
  }
  return "Phone number can contains numbers only...";
}

function validateForm(event) {
  event.preventDefault();

  messageBox.innerHTML = "";

  var name = document.forms["order-tickets-form"]["name"].value;
  var surname = document.forms["order-tickets-form"]["surname"].value;
  var email = document.forms["order-tickets-form"]["email"].value;
  var phone = document.forms["order-tickets-form"]["phone"].value;
  var birthDate = document.forms["order-tickets-form"]["birthDate"].value;
  var tickets = document.forms["order-tickets-form"]["tickets"].value;

  if (!isTextValid(name)) {
    messageBox.innerHTML = "You need to provide valid Name!";
  } else if (!isTextValid(surname)) {
    messageBox.innerHTML = "You need to provide valid Surname!";
  } else if (!isEmailValid(email)) {
    messageBox.innerHTML = "You need to provide valid email address!";
  } else if (!isValidPhone(phone)) {
    messageBox.innerHTML = validatePhoneNumber(phone);
  } else if (!isBirthDateValid(birthDate)) {
    messageBox.innerHTML = validateBirthDate(birthDate);
  } else if (!isTicketQuantityValid(tickets)) {
    messageBox.innerHTML = validateTicketQuantity(tickets);
  }
}

form.addEventListener("submit", function(event) {
  validateForm(event);
});

var nightModeToggler = document.querySelector(`#nightModeTogglerWrapper`);
nightModeToggler.addEventListener("click", function(e) {
  if (localStorage.getItem("nightmode")) {
    localStorage.removeItem("nightmode");
    window.location.reload();
  } else {
    localStorage.setItem("nightmode", true);
    setNightMode(localStorage.getItem("nightmode"));
  }
  console.log(localStorage);
});

var headingColorPicker = document.querySelector("#headingColorPicker");
headingColorPicker.addEventListener("change", function(event) {
  var newColor = event.target.value;
  if (newColor.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    localStorage.setItem("preferdColor", newColor);
    setPreferedColor(newColor);
  }
  console.log(localStorage);
});

function setFontSizeHelper(fontSize) {
  localStorage.setItem("fontSize", `${fontSize}` + "rem");
  setFontSize(localStorage.getItem("fontSize"));
}
function setFontSize(isFontSize) {
  if (isFontSize) {
    fontSizeDropDownMenu.innerHTML = isFontSize;
    document.documentElement.style.setProperty(
      "--default-font-size",
      isFontSize
    );
    document.querySelectorAll("h1").forEach(h1 => {
      h1.style.fontSize = isFontSize;
    });
  }
}
function setNightMode(isNightModeOn) {
  if (isNightModeOn) {
    nightModeInput.checked = isNightModeOn;
    document.querySelector("main").style.backgroundColor = "#111";
    document.querySelectorAll("*").forEach(child => {
      child.style.backgroundColor = "#111";
      child.style.borderColor = "white";
      child.style.borderRadius = "0";
      child.style.color = "white";
    });
    document.documentElement.style.setProperty("--default-font-size", "white");
    document.documentElement.style.setProperty("--navbar-bg", "#111");
  }
}

function setPreferedColor(isPreferedColor) {
  if (isPreferedColor) {
    headingColorPicker.value = isPreferedColor;
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      isPreferedColor
    );
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
      h.style.color = isPreferedColor;
    });
  }
}

var largeFontButton = document.querySelector("#largeFont");
var mediumFontButton = document.querySelector("#mediumFont");
var defaultFontButton = document.querySelector("#defaultFont");
var fontSizeDropDownMenu = document.querySelector("#fontSizeDropDownMenu");
var nightModeInput = document.querySelector("#nightModeToggler");

largeFontButton.addEventListener("click", () => setFontSizeHelper(4.5));

mediumFontButton.addEventListener("click", () => setFontSizeHelper(3));

defaultFontButton.addEventListener("click", () => setFontSizeHelper(2.5));

var resetSettingsBtn = document.querySelector("#resetSettingsBtn");
resetSettingsBtn.addEventListener("click", e => {
  localStorage.clear();
  window.location.reload();
});

window.addEventListener("DOMContentLoaded", () => {
  var isNightModeOn = localStorage.getItem("nightmode");
  var isFontSize = localStorage.getItem("fontSize");
  var isPreferedColor = localStorage.getItem("preferdColor");

  setNightMode(isNightModeOn);
  setFontSize(isFontSize);
  setPreferedColor(isPreferedColor);
});
