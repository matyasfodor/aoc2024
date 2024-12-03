import { readFileSync } from "fs";
import path from "path";

const part1 = true;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const re = /mul\((?<left>\d+),(?<right>\d+)\)/g
const re1 = /mul\((?<left>\d+),(?<right>\d+)\)/


const val = input.match(re)?.reduce((acc: number, elem) => {
  const groups = elem.match(re1)?.groups ?? {};
  const val = parseInt(groups['left']) * parseInt(groups['right']);
  return acc + val;
}, 0)

console.log(val)
