var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).click(function(event) {
    if (!started) {
        nextSequence();
        started = true;
    }

});

$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress(this.id)

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];

    level++

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        startOver()
        $("#level-title").text("Game Over Press Any Key To Restart!");
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
};

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
