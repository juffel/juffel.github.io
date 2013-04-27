/**
 * 
 *
 */

// initialize canvas
document.writeln("<canvas id='screen' width='" + window.innerWidth + "' height='" + window.innerHeight + "'></canvas>")
unloadScrollbars();

// react on window resize

var screen = document.getElementById("screen");
var context = screen.getContext("2d");

// TESTING WITH CANVAS
// paint it black!
context.fillStyle = "black";
context.fillRect(0, 0, screen.width, screen.height);

context.font = "bold 20px TlwgTypewriter";
context.fillStyle = "#00FF00";
context.fillText("Hello World again!", 0, 20);
context.fillText("Grumpy wizard make toxic brew for the evil Queen and Jack", 0, 40);
