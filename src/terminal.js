function Terminal(divName) {

    _initCanvas(divName);

    // settings
    var textSize = 20;
    var fontType = "bold " + textSize + "px MonoSelf";
    var rowMargin = 2; // margin between two rows of text
    var textColor = "#00FF00";
    var leftMargin = 5;
    var backgroundColor = "black";
    var inputRowHeight = textSize + 2*rowMargin;
    var promptChar = "> ";

    var screen;
    var ctx;
    var cursor;
    var content = []; // array of lines of text
    var inputBuffer = "";
    var cursorStat = true;
    var inputHandler;

    _init();
    // TODO anfänglichen ladebalken anzeigen oder so

    // cursor must blink!

    function write(line) {
        // TODO splice long lines into several lines
        content.push(line);
        _drawContent();
    }
    
    function writeln(line) {
        write(line);
        write("");
    }

    function centerWrite(line) {
        var midX = (screen.width/2);
        var midY = (screen.height/2);
        clear();
        _placeText(line, midX, midY);
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

        // place horizontal line between input and output area
        ctx.fillStyle = textColor;
        ctx.fillRect(0, screen.height - inputRowHeight - 15, screen.width, 5);
    }
    
    function _init() {
        // blacken screen
        screen = document.getElementById("screen");
        ctx = screen.getContext("2d");
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, screen.width, screen.height);

        screen.onkeypress = function(event) {
            _handleKeypress(event);
        };
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
            var factor = (inputBuffer.length+promptChar.length);
            _placeText("*", ctx.measureText(" ").width*factor + leftMargin, screen.height);
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

    function _initCanvas(divName) {
        var area = document.getElementById(divName);
        var width = window.innerWidth;
        var height = window.innerHeight;
        area.innerHTML = "<canvas id='screen' tabindex='1' width='" + width + "' height='" + height + "' onkeypress='getChar()'></canvas>";
        // does not work...
        unloadScrollbars(); // disable scrollbars
        area.focus(); // set focus on canvas
    }

    function enablePrompt() {
        cursor = setInterval(function() {_toggleCursorBlink();}, 300);
    }

    function disablePrompt() {
        // TODO maybe disable user input?
        clearInterval(cursor);
        clear();
    }

    return {
        setInputHandler : setInputHandler,
        write : write,
        writeln : writeln,
        centerWrite : centerWrite,
        clear : clear,
        enablePrompt : enablePrompt,
        disablePrompt : disablePrompt
    }
};
window.Terminal = Terminal;
