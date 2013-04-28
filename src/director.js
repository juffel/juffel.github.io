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
        terminal.clear();
        terminal.write("<< " + current.getTitle() + " >>");
        terminal.write("");
        terminal.write(current.getDescription());
    }

    function addScene(scene) {
        scenes[scene.getID()] = scene;
    }

    function manageInput(userInput) {
        // tokenize
        var tokens = userInput.split(" ,;-_");

        // draw consequences
        for(var i = 0; i < tokens.length; i++) {
            for(var j = 0; j < current.options.length; j++) {
                // iterate over all tags of options of the current scene
                for(var k = 0; k < current.options[j].tags; k++) {
                    
                    if(tokens[i] === current.options[j].tags[k]) {
                        setScene(current.options[j].destination);
                    }
                }
            }
        }
        
        // no matching tag found
        terminal.write(noSorry[Math.random()*noSorry.length]);
        var noSorry = ["Try something else!", "This is no use.", "Think of a different approach!", "That's just useless.", "You cannot do that!", "This is unappropriate.", "Something else has to be done now."];
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
