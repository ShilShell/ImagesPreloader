//get a reference to the file system module
var fs = require('fs');

//get a reference to the uglify-js module
var UglifyJS = require('uglify-js');

var code = fs.readFileSync("dist/ImagesDownloader.js", "utf8");
//get a reference to the minified version of file-1.js
var result = UglifyJS.minify(code);

fs.writeFile("dist/ImagesDownloader.min.js", result.code, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("File was successfully saved.");
    }
});