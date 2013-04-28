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
    var promptChar = "> ";

    var screen;
    var ctx;
    var content = []; // array of lines of text
    var inputBuffer = "";
    var cursorStat = true;
    var inputHandler;

    _init();

    // cursor must blink!

    function write(line) {
        content.push(line);
        _drawContent();
    }

    function writeln(line) {
        write(line + "\n");
    }

    function setInputHandler(handler) {
        inputHandler = handler;
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

        // next line: "-1" because there is a additional (input) line to be placed
        var rowCount = (screen.height / (textSize + rowMargin)) - 1;
        content.splice(-rowCount, 0); // drop old content-entries, which are not displayable anymore

        for(var i = content.length-1; i >= 0  ; i--) {
            var yPos = screen.height - inputRowHeight - (content.length - i)*(rowMargin + textSize);
            _placeText(content[i], leftMargin, yPos);
        }

        // redraw Prompt
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
        setInterval(function() {_toggleCursorBlink();}, 300);
    }
    
    function _handleKeypress(event) {
        var charCode = event.which;
        // if(isEnter)
        if(charCode === 13) {
            content.push(promptChar + inputBuffer);
            var tmp = inputBuffer;
            inputBuffer = ""; // aktuelle Zeile zurücksetzen
            _drawContent();
            inputHandler(tmp); // aktuelle Zeile weiterschicken
        }
        // if(isBackspace)
        else if(charCode === 8) {
            // TODO
        }
        else {
            inputBuffer = inputBuffer + String.fromCharCode(charCode);
            _redrawInputRow();
        }
    }

    function _toggleCursorBlink() {
        cursorStat = !cursorStat;
        _redrawInputRow();
        if(cursorStat) {
            // String basteln, der transparent über die inputRow gelegt werden kann, sodass an deren Ende ein Zeichen erscheinen kann
            var buf = promptChar;
            for(var i = 0; i < inputBuffer.length; i++) {
                buf = buf + " ";
            }
            buf = buf + "*";
            _placeText(buf, leftMargin, screen.height);
        }
    }
    
    function _redrawInputRow() {
        ctx.clearRect(0, screen.height-inputRowHeight, screen.width, screen.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, screen.height-inputRowHeight, screen.width, screen.height);
        _placeText(promptChar + inputBuffer, leftMargin, screen.height);
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
