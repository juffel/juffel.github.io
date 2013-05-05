fs = require('fs');

// get path from commandline argument
// var path = process.argv[2];
var path = '../scenes/scenes.txt';

if(path.slice(path.lastIndexOf('.'), path.length) !== '.txt') {
    console.log('filetype is not .txt but ' + path.slice(path.lastIndexOf('.'), path.length) + '\n file will be processed but be aware of unexpected consequences!');
}

// read from file
var results = 'no results';
fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    // process file content
    results = parseScenes(data);

    // write results to file
    fs.writeFile(path.slice(0, path.length-4) + '.js', results, 'utf8', function(err) {
        if(err) {
            return consle.log(err);
    }});
});


function parseScenes(string) {
    
    var results = [];

    for(var i = 0; i < string.length; ) {

        var current = {};

        var marker = i;
        // read id
        while(string[i] !== "/") {
            i++;
        }
        var id = string.substring(marker, i);
        id = trunc(id);
        current.id = id;
        console.log(id);

        // read title
        marker = i;
        // read title
        while(string[i] !== "\n") {
            i++;
        }
        var title = string.substring(marker, i);
        title = trunc(title);
        current.title = title;
        console.log(title);

        // read description
        marker = i;
        while(string[i] !== "\n") {
            i++;
        }
        var description = string.substring(marker, i);
        description = trunc(description);
        current.description = description;
        console.log(description);

        debugger;

        // read options
        current.options = [];
        while(string[i] !== "\n" && string[i-1] !== "\n") {
            var option = {};
            marker = i;

            // read name of option
            while(string[i] !== ":") {
                i++;
            }
            var oname = string.substring(marker, i);
            option.name = trunc(oname);
            console.log(oname);

            option.tags = [];
            // read tags of name of option
            while(string[i] !== "\n") {
                marker = i;
                while(string[i] !== ",") {
                    i++;
                }
                var tag = string.substring(marker, i);
                tag = trunc(tag);
                option.tags.push(tag);
                i++;
            }
            console.log(option.tags);
            current.options.push(option);
            debugger;
            
        }
        results.push(current);
    }
    return results;
};

// removes starting and trailing whitespaces from strings
function trunc(string) {
    var result = string;
    // starting whitespaces
    while(result[0] === ' ') {
        result = result.slice(1, result.length-1);
    }

    // trailing whitespaces
    while(result[result.length-1] === ' ') {
        result = result.slice(0, result.length - 1);
    }

    return result;
};
