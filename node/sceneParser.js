fs = require('fs');

// get path from commandline argument
// var path = process.argv[2];
var path = 'scenes/scenes.txt';

if(path.slice(path.lastIndexOf('.'), path.length) !== '.txt') {
    console.log('filetype is not .txt but ' + path.slice(path.lastIndexOf('.'), path.length) + '\n file will be processed but be aware of unexpected consequences!');
}

// read from file
var result = 'no results';
fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    // process file content
    result = parseScenes(data);

    // write results to file
    fs.writeFile(path.slice(0, path.length-4) + '.js', result, 'utf8', function(err) {
        if(err) {
            return console.log(err);
    }});
});


function parseScenes(string) {
    
    var results = [];

    for(var i = 0; i < string.length; ) {

        var current = {};

        var marker = i;
        // read id
        while(string[i] !== '/' && i < string.length) {
            i++;
        }
        var id = string.substring(marker, i);
        id = trunc(id);
        current.id = id;
        console.log(id);
        i++;// step over '/'

        // read title
        marker = i;
        // read title
        while(string[i] !== '\n' && i < string.length) {
            i++;
        }
        var title = string.substring(marker, i);
        title = trunc(title);
        current.title = title;
        console.log(title);
        i++; // step over '\n'

        // read description
        marker = i;
        while(string[i] !== '\n' && i < string.length) {
            i++;
        }
        var description = string.substring(marker, i);
        description = trunc(description);
        current.description = description;
        console.log(description);
        i++; // step over '\n'


        // read options
        current.options = [];
        while(!(string[i] === '\n' && string[i+1] === '\n') && i < string.length) {
            var option = {};
            marker = i;

            // read name of option
            while(string[i] !== ':' && i < string.length) {
                i++;
            }
            var oname = string.substring(marker, i);
            option.name = trunc(oname);
            console.log(oname);
            i++; // step over ':'

            option.tags = [];
            // read tags of name of option
            while(string[i] !== '\n' && i < string.length) {
                marker = i;
                while(string[i] !== ',' && string[i] !== '\n' && i < string.length) {
                    i++;
                }
                var tag = string.substring(marker, i);
                tag = trunc(tag);
                option.tags.push(tag);
                if(string[i] === ',') {
                    i++;
                }
            }
            console.log(option.tags);
            current.options.push(option);
        }
        results.push(current);
        i++; // step over '\n'
    }
    
    var out = "var sceneList = [ ";

    // build code
    for(var i = 0; i < results.length; i++) {
        if(i > 0) {
            out = out.concat(", ");
        }
        out = out.concat(writeScene(results[i].id, results[i].title, results[i].description, results[i].options));
    }

    out = out.concat(" ];");
    return out;
};

function writeScene(id, title, description, options) {
    var res = "";
    res = res.concat("new Scene(\"" + id, "\", \"" + title + "\", \"" + description + "\", " + "[ ");

    for(var i = 0; i < options.length; i++) {
        if(i > 0) {
            res = res.concat(", ");
        }
        res = res.concat("new Option([ ");
        
        for(var j = 0; j < options[i].tags.length; j++) {
            if(j > 0) {
                res = res.concat(", ");
            }
            res = res.concat("\"" + options[i].tags[j] + "\"");
        }
        res = res.concat(" ], \"" + options[i].name + "\")");
    }

    res = res.concat(" ])");
    return res;
}


// removes starting and trailing whitespaces and newlines from strings
function trunc(string) {
    var result = string;
    // starting whitespaces
    while(result[0] === ' ' || result[0] === '\n') {
        result = result.slice(1);
    }

    // trailing whitespaces
    while(result[result.length-1] === ' ' || result[result.length-1] === '\n') {
        result = result.slice(0, -1);
    }

    return result;
};
