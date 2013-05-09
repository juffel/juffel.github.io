var terminal = new Terminal("canvasArea", function() {
    var director = new Director(terminal);

    terminal.setInputHandler(function(inputString) {
        director.manageInput(inputString);
    });

    director.start();
});
