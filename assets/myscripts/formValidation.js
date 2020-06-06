function validateForm(event) {
  var x = document.forms["order-tickets-form"]["name"].value;
  alert(x);

  /**
   *
   *
   *order-tickets-form
   */
}

var form = document.querySelector("#order-tickets-form");
form.addEventListener("submit", function(e) {
  alert("form-submited!");
});
