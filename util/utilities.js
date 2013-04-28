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
