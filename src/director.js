function Director(terminal) {

    var current = ""; // id of current scene
    var scenes = [];
    var terminal = terminal;

    terminal.disablePrompt();
    _loadingScreen();

    function setScene(sceneID) {
        // TODO emphasize options appearing in description
        current = scenes[sceneID];
        if(!current) {
            console.log("No scene found with ID \"" + sceneID + "\"");
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
        var tokens = userInput.split(" ");

        // draw consequences
        // TODO add some global options e.g. "help"
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

    function _loadingScreen() {
        var i = 0;
        var cycle = function(i) {
            if(i < 20) { 
                if (i%4 === 0) { terminal.centerWrite("..."); }
                else if(i%4 === 1) { terminal.centerWrite("*.."); }
                else if(i%4 === 2) { terminal.centerWrite(".*."); }
                else if(i%4 === 3) { terminal.centerWrite("..*"); }

                i++;
                window.setTimeout(function() { cycle(i); }, 100);
            }
            else { terminal.enablePrompt(); tmpScenes(); }
        };
        cycle(i);
    }

    function loadScenes(path) {
        // TODO
        console.log("loadScenes(path) not yet implemented");
    }

    // requires a variable scenes containing an array of Scene-objects to be in namespace
    function tmpScenes() {
        for(var i = 0; i < sceneList.length; i++) {
            addScene(sceneList[i]);
        }
        setScene("start");
    }

    return {
        manageInput : manageInput,
        setScene : setScene,
        addScene : addScene,
        loadScenes : loadScenes
    }
};
window.Director = Director;
