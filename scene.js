function scene(name) {
    return {
        getDescription : getDescription,
        getOptions : getOptions,
        chooseOption : chooseOption // returns reference to next scene, depending on choice
    }
};
