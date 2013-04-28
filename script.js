var terminal = new Terminal();

var director = new Director(terminal);

terminal.setInputHandler(function(inputString) {
    director.manageInput(inputString);
});

for(var i = 0; i < scenes.length; i++) {
    director.addScene(scenes[i]);
}
director.setScene("start");
