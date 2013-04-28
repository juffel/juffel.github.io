function Option(name, tags, destination) {

    var name = name;
    var tags = tags;
    var destination = destination; // reference to scene that follows the choice of this option
    var consequences = []; // e.d. get item

    function getName() {
        return name;
    }
    
    function getTags() {
        return tags;
    }

    function getDestination() {
        return destination;
    }

    return {
        getName : getName,
        getTags : getTags,
        getDestination : getDestination,
    }
};
window.Option = Option;
