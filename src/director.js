function Director(terminal) {

    var current = ""; // id of current scene
    var scenes = [];
    var terminal = terminal;

    function setScene(sceneID) {
        // TODO emphasize options appearing in description
        current = scenes[sceneID];
        if(!current) {
            console.log("No scene found with ID \"" + sceneID + "\"");
            return;
        }
        // terminal.clear();
        terminal.write("");
        if(current.getTitle()) { terminal.write("<< " + current.getTitle() + " >>"); }
        else { terminal.write("<< UNTITLED SCENE >>"); }
        if(current.getDescription()) { terminal.write(current.getDescription()); }
        else { terminal.write("Be careful! You set step on uncharted land. Please leave the place as you found it!"); }
        if(current.getOptions().length === 0) {
            terminal.write("");
            terminal.write("There is no return from this state but to admit defeat and bear the consequences.");
        }
    }

    function addScene(scene) {
        scenes[scene.getID()] = scene;
    }

    function manageInput(userInput) {
        // tokenize
        var tokens = userInput.split(" ");

        // draw consequences
        // TODO add some global options
        /* like :q, --help, help, quit() */
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
        var noSorry = ["Try something else!", "This is no use.", "Think of a different approach!", "That's just useless.", "You cannot do that!", "This is inappropriate.", "Something else has to be done now."];
        terminal.write(noSorry[Math.floor(Math.random()*noSorry.length)]);
    }

    function loadScenes(path) {
        // TODO
        console.log("loadScenes(path) not yet implemented");
    }

    // requires a variable scenes containing an array of Scene-objects to be in namespace
    function start() {
        for(var i = 0; i < sceneList.length; i++) {
            addScene(sceneList[i]); // sceneList.js is imported in html-file
        }
        setScene("start");
    }

    return {
        manageInput : manageInput,
        setScene : setScene,
        addScene : addScene,
        loadScenes : loadScenes,
        start : start
    }
};
window.Director = Director;
