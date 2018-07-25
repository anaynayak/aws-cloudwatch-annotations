var Parser = require('jsonparse');

function read(callback) {
    var parser = new Parser();
    process.stdin.on("readable", function () {
        var chunk = process.stdin.read();
        if (chunk) {
            parser.write(chunk);
        }
    });

    parser.onValue = function (v) {
        if (this.stack.length === 0) {
            callback(v);
        }
    };
}

module.exports.read = read