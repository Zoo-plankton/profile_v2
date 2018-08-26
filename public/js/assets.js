// TOGGLE

var toggleColor = document.querySelector('.toggle-bg');
var isOn = false;

function changeToggle() {
  toggleColor.style.setProperty('background', document.querySelector('input[name="radio"]:checked').value);
}

function toggle(){
  if (!isOn){
    toggleColor.style.transform = "translateX(0px)";
    isOn = true;
  } else {
    toggleColor.style.transform ="translateX(-40px)";
    isOn = false;
  }
}

document.querySelector('.slider').addEventListener('click', toggle);

document.querySelectorAll('input[name="radio"]').forEach(function(radio){
  radio.addEventListener('click', changeToggle);
});

// REGISTER FORM

var modal = document.querySelector('.modal');
var box = document.querySelector('.register-box');
var nameBox = document.querySelector('.name-form');
var first = document.querySelector('.first-name');
var last = document.querySelector('.last-name');
var email = document.querySelector('.email');
var passwordBox = document.querySelector('.password-form');
var password = document.querySelector('.password');
var rePassword = document.querySelector('.re-password');
var next = document.querySelector('.next');
var prev = document.querySelector('.prev');
var submit = document.querySelector('.submit');

// For some reason, the modal background during showForm() is a bit weird in Chrome. Modifying the viewport in any way (resizing, scrolling, etc.) fixes it. ¯\_(ツ)_/¯

function showForm(){
  setTimeout(function(){
    modal.style.opacity ='1';
    box.style.setProperty('transform', 'translate(0, 0)');
    submit.disabled = true;
  }, 100);
  modal.style.top = 0;
  first.focus();
}

function hideForm(){
  box.style.setProperty('transform', 'translate(200vw, 0px)');
  setTimeout(function(){
    modal.style.setProperty('opacity', 0);
    setTimeout(function(){
       modal.style.top = '100%';
       resetForm();
    },200);
  }, 300);
  ;
}

function submitForm(){
  greatJob();
  hideForm();
}

function resetForm() {
  Object.assign(nameBox.style,{
    transform: "rotateY(0deg)",
    zIndex: '1',
  });
  Object.assign(passwordBox.style,{
    transform: "rotateY(90deg)",
  });

  first.value = "Edmund";
  last.value = "Chicane";
  email.value = "info@cryptonomica.com";
  password.value = "";
  rePassword.value = "";
}

function formNext(){
  Object.assign(nameBox.style,{
    transform: "rotateY(-90deg)",
    zIndex: '0',
  });
  Object.assign(passwordBox.style, {
    transform: "rotateY(0deg)",
  });
  changeName();
  password.focus();
}

function formPrev(){
  Object.assign(nameBox.style,{
    transform: "rotateY(0deg)",
    zIndex: '1',
  });
  Object.assign(passwordBox.style, {
    transform: "rotateY(90deg)",
  });
}

function checkName() {
  if (first.checkValidity() && last.checkValidity() && email.checkValidity() === true){
    next.disabled = false;
  } else{
    next.disabled = true;
  }
}

function changeName(){

  // var firstName = first.value.substring(0,1).toUpperCase() + first.value.substring(1).toLowerCase();
  // var lastName = last.value.substring(0,1).toUpperCase() + last.value.substring(1).toLowerCase();

  //  ^ Formats name to start with an uppercase character followed by lowecase characters, but does not work with hyphenated or apostraphed names.

  document.querySelector('.full-name').innerHTML = first.value + " " + last.value;
  document.querySelector('.full-email').innerHTML = email.value.toLowerCase();
}

function comparePassword() {
  if (password.value === rePassword.value && password.checkValidity() === true) {
    rePassword.setCustomValidity("");
    submit.disabled = false
  } else {
    rePassword.setCustomValidity("Passwords do not match.");
    submit.disabled = true
   }
}

var gg = document.querySelector(".great-job");

function greatJob() {
  function animate() {
    Object.assign(gg.style, {
    transform: "translateY(-80px)",
    opacity: 0,
    });
  };

  function reset() {
   gg.style.transform = "translateY(0px)";
   gg.style.display = "none";
  }

  gg.style.opacity = 1;
  gg.style.display = "flex";
  setTimeout(animate,100);
  setTimeout(reset, 1000);
}

email.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode === 13){
    next.click();
  }
})

rePassword.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode === 13){
    submit.click();
  }
})

next.addEventListener('click', formNext);
prev.addEventListener('click', formPrev);
submit.addEventListener('click', submitForm);

box.addEventListener('click', function(box){
  box.stopPropagation();
})

document.querySelector('.sign-up').addEventListener('click', showForm);
modal.addEventListener('click', hideForm);

resetForm();
