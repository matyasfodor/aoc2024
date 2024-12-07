import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const combine = ({
  currentValue,
  numbers,
  index,
  expectedResult,
}: {
  currentValue: number;
  numbers: number[];
  index: number;
  expectedResult: number;
}) => {
  // console.log("##", currentValue, index);
  if (index === numbers.length) {
    // console.log(currentValue, expectedResult)
    return currentValue === expectedResult;
  }
  return combine({
    currentValue: currentValue + numbers[index],
    numbers,
    index: index + 1,
    expectedResult,
  }) || combine({
    currentValue: currentValue * numbers[index],
    numbers,
    index: index + 1,
    expectedResult,
  }) || (!part1 && (
    combine({
      currentValue: parseInt(`${currentValue}${numbers[index]}`),
      numbers,
      index: index + 1,
      expectedResult,
    })
  ));
};

const result = input
  .split("\n")
  .map((line) => {
    const [res, numbersRaw] = line.split(":");
    const numbers = numbersRaw.trim().split(" ").map(e => parseInt(e.trim()));
    return { res: parseInt(res), numbers };
  })
  .filter(({ res, numbers }) => {
    return combine({currentValue: numbers[0], numbers, index: 1, expectedResult: res})
  }).reduce((acc, {res}) => acc+res, 0);

console.log(result);
