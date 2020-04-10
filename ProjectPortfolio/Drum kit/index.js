/// alternatively name a variable like so: var numberOfDrumButtons = document.querySelectorAll(".drum").length;     and insert this into for loop's test criterion below,



for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {

  document.querySelectorAll("button")[i].addEventListener("click", function() { //this for loop cycles through i for each listed button in the DOM as a # in an array and gives it the following functionality
    //  var audio = new Audio("sounds/tom-1.mp3");----------> these lines have been replaced
    //  audio.play();   ------------------------------------> with the following switch statements so that we can apply a sound file to each "button" based on their assigned classes (letters here)


    var buttonInnerHTML = this.innerHTML; //checks the inner HTML and then passes that HTML into the fxn

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);
  });

}   //---- everything above is about detecting mouse events/presses, function below is for keyboard events----

document.addEventListener("keydown", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});
//

function makeSound(key) {

  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-1.mp3");
      tom2.play();
      break;

    case "s":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "d":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;


    case "j":
      var kickbass = new Audio("sounds/kick-bass.mp3");
      kickbass.play();
      break;

    case "k":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "l":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    default:
      console.log(buttonInnerHTML); //kinda like an else statement in if/else loops


  }
}

function buttonAnimation(currentKey){
  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function(){
    activeButton.classList.remove("pressed");
  }, 100);

}
