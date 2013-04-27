function Terminal() {
    var width = window.innerWidth - 15;
    var height = window.innerHeight - 10;
    document.writeln("<canvas id='screen' tabindex='1' width='" + width + "' height='" + height + "' onkeypress='getChar()'></canvas>")
    unloadScrollbars();

    // settings
    var fontType = "bold 20px TlwgTypewriter";
    var textSize = 20;
    var rowMargin = 2; // margin between two rows of text
    var textColor = "#00FF00";
    var leftMargin = 5;
    var backgroundColor = "black";
    var inputRowHeight = textSize + rowMargin;

    var screen;
    var ctx;
    var content = []; // array of lines of text
    var inputBuffer = "$ ";

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
        for(var i = content.length; i > 0 && screen.height - inputRowHeight - (textSize+rowMargin)*(content.length - i) >= 0 ; i--) {
            _placeText(content[i-1], leftMargin, screen.height - inputRowHeight - ((i-1)*(textSize + rowMargin)));
        }
        // draw Prompt
        _placeText(inputBuffer, leftMargin, screen.height);
    }

    function _init() {
        // blacken screen
        screen = document.getElementById("screen");
        ctx = screen.getContext("2d");
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, screen.width, screen.height);
        write("WELCOME!");

        screen.onkeypress = function(event) {
            _handleKeypress(event);
        };
    }
    
    function _handleKeypress(event) {
        var charCode = event.which;
        // if (isBackspace) ...
        //// remove last char
        // else ...
        inputBuffer = inputBuffer + String.fromCharCode(charCode);

        ctx.clearRect(0, screen.height-inputRowHeight, screen.width, screen.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, screen.height-inputRowHeight, screen.width, screen.height);
        _placeText(inputBuffer, leftMargin, screen.height);
    }

    function _placeText(string, x, y) {
        ctx.fillStyle = textColor;
        ctx.font = fontType;
        ctx.textAlign = "align";
        ctx.textBaseline = "bottom";
        ctx.fillText(string, x, y);
    }

    return {
        setInputHandler : setInputHandler,
        write : write,
        writeln : writeln,
        clear : clear
    }
};
window.Terminal = Terminal;