function Terminal(divName, beginFunction) {

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

    var begin = beginFunction; // function which is executed, when terminal is ready

    _init();

    function write(line) {
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

        var drawBuf = content.slice(0, 50); // copies the beginning of the array

        // splice long lines into several lines
        var textareaWidth = screen.width - leftMargin;
        for(var i = 0; i < drawBuf.length; i++) {
            ctx.font = fontType;
            var charWidth = ctx.measureText('M').width;
            var lineLength = (promptChar.length + drawBuf[i].length)*charWidth;
            if(lineLength > textareaWidth) {
                var breakIndex = Math.floor((screen.width-leftMargin) / charWidth) - promptChar.length; // where to split the string
                var newLine = drawBuf[i].slice(0, breakIndex); // first part into newLine
                drawBuf[i] = drawBuf[i].slice(breakIndex); // remove first part from rest of line
                drawBuf.splice(i, 0, newLine); // insert new Line
            }
        }

        for(var i = drawBuf.length-1; i >= 0  ; i--) {
            var yPos = screen.height - inputRowHeight - (drawBuf.length - i)*(rowMargin + textSize);
            _placeText(drawBuf[i], leftMargin, yPos);
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

        screen.onkeypress = function(event) { _handleKeypress(event); };
        screen.onkeydown = function(event) { _handleKeydown(event); };

        window.onresize = function(event) { _handleResize(event); };

        _loadingScreen();
    }

    function _loadingScreen() {
        // loading screen while font not loaded
        var ctr = 0;
        var interval = setInterval(function() {
                // if font is monospace, then break timer
                if(ctx.measureText('M').width === ctx.measureText('i').width) {
                    clearInterval(interval);
                    console.log("font loaded");
                    centerWrite("***");
                    // commence with begin-function
                    if(begin) { 
                        enablePrompt();
                        return begin();
                    }
                    else {
                        console.log("no begin function set ( terminal.setBegin( function() {} ) )");
                    }
                }
                else if (ctr%4 === 0) { centerWrite("..."); }
                else if(ctr%4 === 1) { centerWrite("*.."); }
                else if(ctr%4 === 2) { centerWrite(".*."); }
                else if(ctr%4 === 3) { centerWrite("..*"); }
                ctr += 1;
                if(ctr > 1000) {console.log("loading font takes much time...");} 
        }, 10);
    }

    function _handleKeypress(event) {
        var charCode = event.which;
        if(charCode === 13) { // ENTER
            content.push(promptChar + inputBuffer);
            var tmp = inputBuffer;
            inputBuffer = ""; // aktuelle Zeile zurücksetzen
            _drawContent();
            inputHandler(tmp); // aktuelle Zeile weiterschicken
        }
        else if(charCode === 8) {
            // do nothing, normally this block is unreachable and this case is handled by the _handleKeydown(...) function
            console.log("this should not happen!");
        }
        else { // OTHER KEYS
            inputBuffer = inputBuffer + String.fromCharCode(charCode);
            _redrawInputRow();
        }
    }

    // necessary for backspace keyevents
    function _handleKeydown(event) {
        var keyID = event.keyCode;

        if(keyID === 8) { // BACKSPACE
            if(inputBuffer.length > 0) {
                inputBuffer = inputBuffer.slice(0, inputBuffer.length - 1);
                _redrawInputRow();
            }
        }
    }

    function _handleResize(event) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        _drawContent();
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
        area.innerHTML = "<canvas id='screen' tabindex='1' width='" + width + "' height='" + height + "'></canvas>";
        // does not work...
        unloadScrollbars(); // disable scrollbars
        document.getElementById('screen').focus(); // set focus on canvas
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
