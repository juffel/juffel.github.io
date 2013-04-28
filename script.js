var terminal = new Terminal();

terminal.write("Test, test!");
terminal.write("Laeuft immernoch?");
terminal.write("Schoen, schoen!");

terminal.setInputHandler(function(inputString) {
    var tmp = inputString.split("").reverse().join("");
    terminal.writeln(tmp);
});
