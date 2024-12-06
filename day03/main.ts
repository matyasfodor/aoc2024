import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const re = /mul\((?<left>\d+),(?<right>\d+)\)/g
const re1 = /mul\((?<left>\d+),(?<right>\d+)\)/

const extractMuls = (input: string) => input.match(re)?.reduce((acc: number, elem) => {
  const groups = elem.match(re1)?.groups ?? {};
  const val = parseInt(groups['left']) * parseInt(groups['right']);
  return acc + val;
}, 0) ?? 0;

if (part1) {
  console.log(extractMuls(input));
} else {
  const splitInput = input.split(/don\'t.*do\(\)/g);
  console.log(`Split input size ${splitInput.length}`)
  const val = splitInput.reduce((acc, stringPart) => {
    return acc + extractMuls(stringPart);
  }, 0);
  console.log(val);
}

// 93252440 - too high