import * as fs from "fs";

let rules = {
  red: 12,
  green: 13,
  blue: 14,
} as Rules;

debug(rules);

const inputFile = fs.readFileSync("./day2input", "utf-8");
let games = parseGames(inputFile);
let outputSum: number = 0;

debug(games);
games.forEach((game) => {
  debug(formatGame(game));
  const isValidGame = isValid(game, rules);
  debug(`Is valid: ${isValidGame}`);
  if (isValidGame) {
    outputSum += game.gameNumber;
  }
});
console.log(outputSum);

function parseGames(inputFile: string): GameInput[] {
  let games = [];
  let i = 0;
  for (const line of inputFile.split(/[\r\n]+/)) {
    games.push(parseInput(line));
  }
  return games;
}

interface Rules {
  red: number;
  green: number;
  blue: number;
}

type GameInput = {
  gameNumber: number;
  rounds: {
    colors: {
      color: string;
      count: number;
    }[];
  }[];
};

function parseInput(input: string): GameInput {
  const gameInput: GameInput = {
    gameNumber: 0,
    rounds: [],
  };

  const match = input.match(/^Game (\d+):(.*)/);
  if (!match) {
    throw new Error("Invalid input format");
  }

  gameInput.gameNumber = parseInt(match[1], 10);

  const roundMatches = match[2].matchAll(/(\d+) (\w+)/g);
  for (const roundMatch of roundMatches) {
    debug(roundMatch);
    const count = parseInt(roundMatch[1], 10);
    const color = roundMatch[2];
    if (
      gameInput.rounds.length === 0 ||
      gameInput.rounds[gameInput.rounds.length - 1].colors.length !== 0
    ) {
      gameInput.rounds.push({ colors: [] });
    }
    gameInput.rounds[gameInput.rounds.length - 1].colors.push({ color, count });
  }

  return gameInput;
}

function isValid(game: GameInput, rules: Rules): boolean {
  for (const round of game.rounds) {
    for (const { color, count } of round.colors) {
      if (!(color in rules)) {
        // If the color is not defined in the rules, consider it unlimited
        continue;
      }

      if (count > rules[color]) {
        debug(`Game false because color ${color}: ${count} ${rules[color]}> `);
        return false;
      }
    }
  }
  return true;
}

function formatGame(game: GameInput): string {
  const formattedRounds = game.rounds
    .map((round) => {
      const formattedColors = round.colors
        .map(({ color, count }) => `{ color: '${color}', count: ${count} }`)
        .join(",\n      ");
      return `{\n      colors: [\n      ${formattedColors}\n      ],\n    }`;
    })
    .join(",\n    ");

  return `game: GameInput = {\n  gameNumber: ${game.gameNumber},\n  rounds: [\n    ${formattedRounds}\n  ],\n};`;
}

function debug(message: any) {
  console.debug(message);
}
