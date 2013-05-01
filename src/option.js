function Option(tags, destination) {

    var tags = tags;
    var destination = destination; // reference to scene that follows the choice of this option
    var consequences = []; // e.d. get item

    function getTags() {
        return tags;
    }

    function getDestination() {
        return destination;
    }

    return {
        getTags : getTags,
        getDestination : getDestination,
    }
};
window.Option = Option;
