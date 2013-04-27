function Terminal() {
    document.writeln("<canvas id='screen' width='" + window.innerWidth + "' height='" + window.innerHeight + "'></canvas>")
    unloadScrollbars();

    // cursor must blink!
    
    return {
        setInputHandler : setInputHandler,
        write : write,
        writeln : writeln,
        clear : clear
    }
};
