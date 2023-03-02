const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
let level = 0;


$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


let functionCalled = false;
$(document).keypress(function(){
    if (!functionCalled){
        nextSequence()
        functionCalled = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        let lose = new Audio("sounds/" + "wrong" + ".mp3");
        lose.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#" + "level-title").html("Game Over, Press Any Key to Restart");
        startOver()
      }
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#" + "level-title").html("Level: " + level);
    
    let randomNumber = Math.floor((Math.random() * 10) % 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(color){
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    functionCalled = false
    $("#" + "level-title").html("Press any Key to Start");
}