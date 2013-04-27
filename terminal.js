function Terminal() {
    document.writeln("<canvas id='screen' width='" + window.innerWidth + "' height='" + window.innerHeight + "'></canvas>")
    unloadScrollbars();

    _init();

    var content = []; // array of lines of text

    // cursor must blink!

    function _drawContent() {
        ctx.clearRect(0, 0, screen.width, screen.height);
    }

    function _init() {
        // blacken screen
        var screen = document.getElementById("screen");
        var ctx = screen.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, screen.width, screen.height);
        // set textstyle
        ctx.fillStyle = "#00FF00";
        ctx.font = "bold 20px TlwgTypewriter";
        ctx.fillText("WELCOME!", 5, 20);
    }
    
    return {
        setInputHandler : setInputHandler,
        write : write,
        writeln : writeln,
        clear : clear
    }
};
window.Terminal = Terminal;
