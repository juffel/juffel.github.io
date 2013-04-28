function Scene(id, title) {
    var id = id;
    var title = title;
    var description = "";
    var options = [];

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

    function addOption(option) {
        options.push(option);
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
