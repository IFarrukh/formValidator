const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Show input error messege
const showError = (input, messege) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = messege;
};

//Show input success messege
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// Check email validation
const emailCheck = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(email.value.trim())
    ? showSuccess(email)
    : showError(email, "email is not valid");
};

// Check required fields
const checkRequired = inputArr => {
  inputArr.forEach(input => {
    input.value.trim() === ""
      ? showError(input, `${input.id} is required`)
      : showSuccess(input);
  });
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  input1.value !== input2.value
    ? showError(input2, "Password do not match")
    : null;
};

//Check field length
const checkLength = (input, min, max) => {
  input.value.length < min
    ? showError(input, `${input.id} must be at least ${min} characters`)
    : input.value.length > max
    ? showError(input, `${input.id} must be less than ${max} characters`)
    : showSuccess(input);
};

// Event Listeners
form.addEventListener("submit", e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  emailCheck(email);
  checkPasswordsMatch(password, password2);
});
