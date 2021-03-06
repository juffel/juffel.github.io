// src: http://stackoverflow.com/questions/242608/disable-browsers-vertical-and-horizontal-scrollbars
function unloadScrollbars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}
function loadScrollbars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
}
window.unloadScrollbars = unloadScrollbars;
window.loadScrollbars = loadScrollbars;

function parseScenes(string) {
    
    var results = [];

    for(var i = 0; i < string.length; ) {

        var marker = i;

        while(string[i] !== "/") {
            i++;
        }
        var id = string.substring(marker, i);

        marker = i;
        while(string[i] !== "\n") {
            i++;
        }
        var title = string.substring(marker, i);

        marker = i;
        while(string[i] !== "\n") {
            i++;
        }
        var description = string.substring(marker, i);

        var options = [];
        while(string[i] !== "\n" && string[i-1] !== "\n") {
            var name;
            var tags = [];
            marker = i;
            while(string[i] !== ":") {
                i++;
            }
            name = string.substring(marker, i);
            while(string[i] !== "\n") {
                marker = i;
                while(string[i] !== ",") {
                    i++;
                }
                tags.push(string.substring(marker, i));
                i++;
            }
            options.push(new Option(name, tags));
            
        }
        results.push(new Scene(id, title, description, options));
    }
    return results;
};
window.parseScenes = parseScenes;
