
var terminal = new Terminal("canvasArea");

var director = new Director(terminal);

terminal.setInputHandler(function(inputString) {
    director.manageInput(inputString);
});
