var colorArray = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//User Pattern and animation
$(".btn").on("click", function () {
  if (!started) return;
  var userClickedColor = $(this).attr("id");
  userClickedPattern.push(userClickedColor);
  checkAnswer(userClickedPattern.length - 1);
  $("." + userClickedColor).addClass("pressed");
  setTimeout(() => {
    $("." + userClickedColor).removeClass("pressed");
  }, 100);
  playSound(userClickedColor);
});

// Computer Pattern and animation
function sequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colorArray[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
  level++;
  $("#level-title").text("Level " + level);
}

//function to play sound
function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

//Game start
$(document).on("keydown", () => {
  if (!started) {
    $("#level-title").text("Level");
    sequence();
    started = true;
  }
});

//checking user answer
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] == userClickedPattern[currentIndex]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {
        sequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press any key to Restart");
    gameRestart();
  }
}

//Game restart
function gameRestart() {
  level = 0;
  started = false;
  gamePattern = [];
}
