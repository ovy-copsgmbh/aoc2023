import * as fs from "fs";

const inputFile = fs.readFileSync("./day1input", "utf-8");
let outputSum: number = 0;
for (const line of inputFile.split(/[\r\n]+/)) {
  console.log(`LINE: ${line}`);
  const result = createNumberFirstLast(line);
  console.log(`RESULT: ${result}`);
  outputSum += result;
  console.log(`SUM: ${outputSum}`);
}

console.log(outputSum);

function reverseString(str: string) {
  let strArr = str.split("");
  let reverseArr = strArr.reverse();
  let reverseStr = reverseArr.join("");
  return reverseStr;
}

function replaceWordsWithNumbers(input: string): string {
  const wordToNumberMap: { [key: string]: string } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const regexPattern = new RegExp(Object.keys(wordToNumberMap).join("|"), "gi");

  return input.replace(regexPattern, (matched) => {
    return wordToNumberMap[matched.toLowerCase()];
  });
}
function replaceWordsWithNumbersBack(input: string): string {
  const wordToNumberMap: { [key: string]: string } = {
    eno: "1",
    owt: "2",
    eerht: "3",
    ruof: "4",
    evif: "5",
    xis: "6",
    neves: "7",
    thgie: "8",
    enin: "9",
  };

  const regexPattern = new RegExp(Object.keys(wordToNumberMap).join("|"), "gi");

  return reverseString(input).replace(regexPattern, (matched) => {
    return wordToNumberMap[matched.toLowerCase()];
  });
}

// Original function
function createNumberFirstLast(input: string): number {
  const replacedDigits = replaceWordsWithNumbers(input);
  const replacedDigitsBack = replaceWordsWithNumbersBack(input);
  console.log(replacedDigits);
  console.log(replacedDigitsBack);
  // Filter out non-digit characters from the input string
  const digitsOnly = replacedDigits.replace(/\D/g, "");
  const digitsOnlyBack = replacedDigitsBack.replace(/\D/g, "");
  console.log(digitsOnly);
  console.log(digitsOnlyBack);

  if (digitsOnly.length === 1 && digitsOnly === digitsOnlyBack) {
    // If there is only one digit in the filtered string,
    // use it as both the first and last digit of the result
    const digit = parseInt(digitsOnly);
    return digit * 10 + digit;
  } else if (digitsOnly.length > 1) {
    // Get the first and last digits of the filtered string
    const firstDigit = parseInt(digitsOnly[0]);
    const lastDigit = parseInt(digitsOnlyBack[0]);
    return firstDigit * 10 + lastDigit;
  } else {
    // If no digits are found in the input string
    return 0;
  }
}
