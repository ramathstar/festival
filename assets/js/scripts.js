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
  } else {
    displayPopUp();
  }
}

if (form) {
  form.addEventListener("submit", function(event) {
    validateForm(event);
  });
}

function setFontSizeHelper(fontSize) {
  localStorage.setItem("fontSize", `${fontSize}` + "rem");
  setFontSize(localStorage.getItem("fontSize"));
}
function setFontSize(isFontSize) {
  if (isFontSize) {
    try {
      fontSizeDropDownMenu.innerHTML = isFontSize;
    } catch (err) {
      //separation of concerns
    }

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
    try {
      document.querySelector(`#nightModeToggler`).checked = true;
    } catch (err) {}
    document.querySelector("main").style.backgroundColor = "#111";
    document.querySelectorAll("*").forEach(child => {
      child.style.backgroundColor = "#111";
      child.style.borderColor = "white";
      child.style.borderRadius = "0";
      child.style.color = "white";
    });
    document.documentElement.style.setProperty("--default-font-size", "white");
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      "white"
    );
    try {
    } catch (err) {}
    document.documentElement.style.setProperty("--navbar-bg", "#111");
  }
}

function setPreferedColor(isPreferedColor) {
  if (isPreferedColor) {
    try {
      if (localStorage.getItem("preferedColor"))
        document.querySelector(
          `#headingColorPicker`
        ).innerHTML = isPreferedColor;
    } catch (err) {}
    document.documentElement.style.setProperty(
      "--secondary-text-color",
      isPreferedColor
    );
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
      h.style.color = isPreferedColor;
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  var isNightModeOn = localStorage.getItem("nightmode");
  var isFontSize = localStorage.getItem("fontSize");
  var isPreferedColor = localStorage.getItem("preferdColor");

  setNightMode(isNightModeOn);
  setFontSize(isFontSize);
  setPreferedColor(isPreferedColor);
});

/** POPUP */

function displayPopUp() {
  //Targets

  document.querySelector(
    "#myModal__firstName"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["name"].value}`;

  document.querySelector(
    "#myModal__lastName"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["surname"].value}`;
  document.querySelector(
    "#myModal__email"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["email"].value}`;
  document.querySelector(
    "#myModal__phone"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["phone"].value}`;
  document.querySelector(
    "#myModal__birthDate"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["birthDate"].value}`;
  document.querySelector(
    "#myModal__tickets"
  ).innerHTML = `  ${document.forms["order-tickets-form"]["tickets"].value}`;

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
  document.querySelector("#popUpclose").onclick = function(event) {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
