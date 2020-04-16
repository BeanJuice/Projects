var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0


$(".btn").click(function() {//when the item with class .btn is clicked run the following code

  var userChosenColor = $(this).attr("id");//saves userChosenColor as the string saved in the id of the div they clicked on

  userClickedPattern.push(userChosenColor);// pushes userChosenColor to the userClickedPattern array
  animatePress(userChosenColor); // animatePress is called on the div the user clicks
  playSound(userChosenColor);// playSound is called and plays corresponding sound for the div that was clicked by user
  // breaks the game as a "cheat"---> checkAnswer(userClickedPattern[level]);
  checkAnswer(userClickedPattern.length-1);//checkAnswer with [currentLevel] being 1-item-length short of the userClickedPattern array --> bc arrays start at 0, we must check on position 0 while on level 1
});

function startOver(){
//this function resets the variables to original values so that game can be played from scratch after failure
  level = 0;
  gamePattern = [];
  started = false;
}


$(document).keypress(function() {
//this function starts the game, changes h1 to the current level, calls nextSequence fxn and sets started to true; also restarts game upon failure
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

function playSound(name) {
// this is a simple play-audio-function that accepts a string to as the desired file name
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
//this adds and removes the pressed class from the nextSequence fxn/randomChosenColor
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  /*complex function so:
-sets/resets the userClickedPattern to an empty array so that it can be filled again on next level (upon player success)... see fxn checkAnswer() for determining success/failure of user
-increments the level var. to go up by 1 upon player success (for more see fxn checkAnswer)
-sets level title to indicate proper level after success (step 1 in creating the progression of events, above two are really later stages of thought/design)
-randomNumber is used to select a randomChosenColor from the set array of buttonColors
-the randomChosenColor is selected by ID via jQuery and fadedin/out to visualize the animation of a button being pressed by the computer
-a sound is played for the appropriate button chosen by the computer (var. randomChosenColor)
  */
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    /*  if the userClickedPattern at [currentLevel] is matching the gamePattern at the same array level then
    console.log a success message (as test in browser/confirmation) and run the next if statement...
    this currentLevel is ambiguous but it allows us to select/check at position 0 by subtracting 1 from the length of whatever is placed inside the () whenever checkAnswer() is called...checkAnswer(x.length-1)
    */

    // console.log("success"); <--- control statement

    if (gamePattern.length === userClickedPattern.length) {
      /*
      if the array contents and length are matching then run the fxn nextSequence() after a delay of 1 second
      */
      setTimeout( function(){
        nextSequence();
      }, 1000);
    }

  } else {
    /*
    else, the user must have messed up the pattern and then the following code runs
    */
    $("#level-title").text("Game Over, Press Any Key to Restart"); // level title changes to game over message

     playSound("wrong") //<--- must be a string in order to concatenate properly

    console.log("wrong");//<---- another control statement

    $("body").addClass("game-over"); //this and following lines flashes the screen red for 0.2 seconds (as per setTimeout fxn)

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
   startOver(); // startOver fxn gets called
  }
}
