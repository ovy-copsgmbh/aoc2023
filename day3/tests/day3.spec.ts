import { sumSchematics } from "../src/day3";

// Jest test for the file reading function
describe("Example schematics", () => {
  test("should return sum 4361", () => {
    const filePath = "./day3/day3inputTest"; // Change this path to your file's path
    const schematicsSum = sumSchematics(filePath);
    expect(schematicsSum).toBe(4361);
    // Add more specific assertions based on your file's content or structure
  });
});
