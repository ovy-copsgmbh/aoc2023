"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var rules = {
    red: 12,
    green: 13,
    blue: 14,
};
var inputFile = fs.readFileSync("./day2input", "utf-8");
var games = parseGames(inputFile);
var outputSum = 0;
games.forEach(function (game) {
    if (!game.isValid(rules)) {
        outputSum += game.gameNumber;
    }
});
console.log(outputSum);
function parseGames(inputFile) {
    var games = [];
    var i = 0;
    for (var _i = 0, _a = inputFile.split(/[\r\n]+/); _i < _a.length; _i++) {
        var line = _a[_i];
        games.push(parseGame(line));
    }
    return games;
}
function parseGame(input) {
    var regex = /Game (\d+): (.+?)(?=Game \d+|$)/gs;
    var match = regex.exec(input);
    if (!match) {
        throw new Error("Invalid input format");
    }
    var gameNumber = parseInt(match[1]);
    var colorGroups = match[2]
        .split(";")
        .map(function (group) { return group.trim().split(", "); });
    var maxColors = [];
    colorGroups.forEach(function (group) {
        var colorInfo = {};
        group.forEach(function (color) {
            var _a = color.split(" "), count = _a[0], colorName = _a[1];
            colorInfo[colorName] = (colorInfo[colorName] || 0) + parseInt(count);
        });
        maxColors.push(colorInfo);
    });
    return {
        gameNumber: gameNumber,
        maxColors: maxColors,
        isValid: function (rules) {
            maxColors.keys.apply(function (color) {
                if (rules[color] < maxColors[color]) {
                    return false;
                }
            });
            return true;
        },
    };
}
