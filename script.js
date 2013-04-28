var terminal = new Terminal();

var director = new Director(terminal);

terminal.setInputHandler(function(inputString) {
    director.manageInput(inputString);
});

var sc = new Scene("start", "IN THE BEGINNING");
sc.setDescription("The Story begins. You are sitting on a backless chair and feel the intense pain of not knowing.");
var end = new Scene("end", "THIS IS THE END");
end.setDescription("And then they lived happily ever after.");

sc.addOption(new Option("Right", ["Right", "right", "Rechts", "rechts", "Droite", "droit"], "end"));

director.addScene(sc);
director.addScene(end);
director.setScene("start");
