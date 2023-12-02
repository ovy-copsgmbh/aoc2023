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
function createNumberOriginal(input: string): number {
  const replacedDigits = replaceWordsWithNumbers(input);
  console.log(replacedDigits);
  // Filter out non-digit characters from the input string
  const digitsOnly = replacedDigits.replace(/\D/g, "");
  console.log(digitsOnly);

  if (digitsOnly.length === 1) {
    // If there is only one digit in the filtered string,
    // use it as both the first and last digit of the result
    const digit = parseInt(digitsOnly);
    return digit * 10 + digit;
  } else if (digitsOnly.length > 1) {
    // Get the first and last digits of the filtered string
    const firstDigit = parseInt(digitsOnly[0]);
    const lastDigit = parseInt(digitsOnly[digitsOnly.length - 1]);
    return firstDigit * 10 + lastDigit;
  } else {
    // If no digits are found in the input string
    return 0;
  }
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

// Optimized function
function createNumberOptimized(input: string): number {
  let firstDigit: number | null = null;
  let lastDigit: number | null = null;

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) {
      const digit = parseInt(input[i]);
      if (firstDigit === null) {
        firstDigit = digit;
      }
      lastDigit = digit;
    }
  }

  if (firstDigit !== null && lastDigit !== null) {
    return firstDigit * 10 + lastDigit;
  } else if (firstDigit !== null) {
    return firstDigit * 10 + firstDigit;
  } else {
    return 0;
  }
}

// Optimized function
function createNumberOptimized2(input: string): number {
  let firstDigit: number | null = null;
  let lastDigit: number | null = null;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= "0" && char <= "9") {
      const digit = parseInt(char);
      if (firstDigit === null) {
        firstDigit = digit;
      }
      lastDigit = digit;
    }
  }

  if (firstDigit !== null && lastDigit !== null) {
    return firstDigit * 10 + lastDigit;
  } else if (firstDigit !== null) {
    return firstDigit * 10 + firstDigit;
  } else {
    return 0;
  }
}

function createNumberOptimized3(input: string): number {
  let firstDigit: number | null = null;
  let lastDigit: number | null = null;

  for (let i = 0, len = input.length; i < len; i++) {
    const char = input[i];
    if (char >= "0" && char <= "9") {
      if (firstDigit === null) {
        firstDigit = parseInt(char);
      }
      lastDigit = parseInt(char);
    }
  }

  if (firstDigit !== null && lastDigit !== null) {
    return firstDigit * 10 + lastDigit;
  } else if (firstDigit !== null) {
    return firstDigit * 10 + firstDigit;
  } else {
    return 0;
  }
}
