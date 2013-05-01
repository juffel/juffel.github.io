function Scene(id, title, description, options) {
    var id = id;
    var title = title;
    var description = description;
    if(options == undefined) {
        var options = [];
    }

    function getID() {
        return id;
    }

    function getTitle() {
        return title;
    }

    function setDescription(descr) {
        description = descr;
    }

    function getDescription() {
        return description;
    }

    function addOption(tags, destination) {
        options.push(new Option(tags, destination));
    }

    function getOptions() {
        return options;
    }

    return {
        setDescription : setDescription,
        getDescription : getDescription,
        addOption : addOption,
        getOptions : getOptions,
        getTitle : getTitle,
        getID : getID
    }
};
window.Scene = Scene;
