import * as fs from "fs";

let rules = {
  red: 12,
  green: 13,
  blue: 14,
} as Rules;

const inputFile = fs.readFileSync("./day2input", "utf-8");
let games = parseGames(inputFile);
let outputSum: number = 0;

debug(games);
games.forEach((game) => {
  if (!game.isValid(rules)) {
    outputSum += game.gameNumber;
  }
});
console.log(outputSum);

function parseGames(inputFile: string): GameInfo[] {
  let games = [];
  let i = 0;
  for (const line of inputFile.split(/[\r\n]+/)) {
    games.push(parseGame(line));
  }
  return games;
}

interface Rules {
  red: number;
  green: number;
  blue: number;
}
interface ColorInfo {
  name: string;
  cubes: number;
}

interface GameInfo {
  gameNumber: number;
  colors: ColorInfo[];
  isValid(rules: Rules): boolean;
}

function parseGame(input: string): GameInfo {
  const parts = input.split(":");
  const gameNumber = parseInt(parts[0].trim().replace("Game", "").trim());
  const colorInfoArray: ColorInfo[] = [];

  const colorGroups = parts[1].split(";");
  debug(colorGroups);
  for (const group of colorGroups) {
    const colors = group.trim().split(",");
    for (const color of colors) {
      const [cubesStr, colorName] = color.trim().split(" ");
      const cubes = parseInt(cubesStr);
      colorInfoArray.push({ name: colorName, cubes });
    }
  }

  return {
    gameNumber,
    colors: colorInfoArray,
    isValid: (rules: Rules) => {
      colorInfoArray.values.apply((colorInfo: ColorInfo) => {
        debug(
          `${rules}[${colorInfo.name}] < ${colorInfoArray}[${colorInfo.name}]`
        );
        if (rules[colorInfo.name] < colorInfoArray[colorInfo.name]) {
          return false;
        }
      });
      return true;
    },
  };
}

function debug(message: any) {
  console.debug(message);
}
