function scene(id, title) {
    var id = id;
    var title = title;
    var description = "";
    var options = [];

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
        addOption : setOptions,
        getOptions : getOptions,
    }
};
