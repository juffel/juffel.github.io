function Director(terminal) {
    var current = ""; // id of current scene
    var scenes = [];
    var terminal = terminal;

    function setScene(sceneID) {
        current = scenes[sceneID];
        if(!current) {
            console.log("No scene found with ID " + sceneID);
            return;
        }
        // terminal.clear();
        terminal.write("");
        terminal.write("<< " + current.getTitle() + " >>");
        terminal.write(current.getDescription());
    }

    function addScene(scene) {
        scenes[scene.getID()] = scene;
    }

    function manageInput(userInput) {
        // tokenize
        var tokens = userInput.split(" ,;-_");

        // draw consequences
        var options = current.getOptions();
        for(var i = 0; i < tokens.length; i++) {
            for(var j = 0; j < options.length; j++) {
                // iterate over all tags of options of the current scene
                var tags = options[j].getTags();
                for(var k = 0; k < tags.length; k++) {
                    if(tokens[i].toUpperCase() === tags[k].toUpperCase()) {
                        setScene(options[j].getDestination());
                        return;
                    }
                }
            }
        }
        
        // no matching tag found
        var noSorry = ["Try something else!", "This is no use.", "Think of a different approach!", "That's just useless.", "You cannot do that!", "This is unappropriate.", "Something else has to be done now."];
        terminal.write(noSorry[Math.floor(Math.random()*noSorry.length)]);
    }

    return {
        manageInput : manageInput,
        setScene : setScene,
        addScene : addScene,
/*        getSceneDescription : getSceneDescription,
        getOptions : getOptions,
        chooseOption : chooseOption,
        chooseScene : chooseScene */
    }
};
window.Director = Director;
