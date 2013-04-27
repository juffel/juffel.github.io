function Terminal() {
    var width = window.innerWidth - 15;
    var height = window.innerHeight - 10;
    document.writeln("<canvas id='screen' width='" + width + "' height='" + height + "'></canvas>")
    unloadScrollbars();

    // settings
    var fontType = "bold 20px TlwgTypewriter";
    var textSize = 20;
    var textColor = "#00FF00";
    var leftMargin = 5;
    var backgroundColor = "black";
    var inputRowHeight = textSize*2;

    var screen;
    var ctx;
    var content = []; // array of lines of text

    _init();

    // cursor must blink!

    function write(line) {
        content.push(line);
        _drawContent();
    }

    function writeln(line) {
        write(line + "\n");
    }

    function setInputHandler() {
        // TODO
    }

    function clear() {
        content = [];
        _clear();
    }

    function _clear() {
        ctx.clearRect(0, 0, screen.width, screen.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, screen.width, screen.height);
    }

    function _drawContent() {
        _clear();
        for(var i = content.length; i > 0 && screen.height - inputRowHeight - textSize*(content.length - i) >= 0 ; i--) {
            ctx.fillStyle = textColor;
            ctx.font = fontType;
            ctx.fillText(content[i-1], leftMargin, screen.height - inputRowHeight - (i*textSize));
        }
    }

    function _init() {
        // blacken screen
        screen = document.getElementById("screen");
        ctx = screen.getContext("2d");
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, screen.width, screen.height);
        write("WELCOME!");
    }
    
    return {
        setInputHandler : setInputHandler,
        write : write,
        writeln : writeln,
        clear : clear
    }
};
window.Terminal = Terminal;
