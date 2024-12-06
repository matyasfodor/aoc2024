import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const letters = input.split("\n").map((e) => e.split(""));

interface Coord {
  x: number;
  y: number;
}

interface Search {
  position: Coord;
  momentum?: Coord;
}

const directions: Coord[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },

  { x: 0, y: -1 },
  { x: 0, y: 1 },

  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

const findHits = (letters: string[][], term: string) => {
  let ret = 0;

  for (let y = 0; y < letters.length; y++) {
    for (let x = 0; x < letters[y].length; x++) {
      if (letters[y][x] === term[0]) {
        for (const direction of directions) {
          for (let i = 1; i < term.length; i++) {
            if (
              !(
                0 <= y + i * direction.y &&
                y + i * direction.y < letters.length &&
                0 <= x + i * direction.x &&
                x + i * direction.x < letters[y].length &&
                letters[y + i * direction.y][x + i * direction.x] === term[i]
              )
            ) {
              break;
            }
            if (i === term.length - 1) {
              ret += 1;
            }
          }
        }
      }
    }
  }

  return ret;
};

const term = "XMAS";

if (part1) {
  console.log(findHits(letters, term));
} else {
  const pattern = [
    ["M", ".", "S"],
    [".", "A", "."],
    ["M", ".", "S"],
  ];

  const transpose = <T>(array: T[][]): T[][] =>
    array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

  const reverseRows = <T>(array: T[][]): T[][] =>
    array.map((row) => [...row].reverse());

  const matchPatterns = [
    [...pattern],
    reverseRows([...pattern]),
    transpose(pattern),
    transpose(reverseRows(pattern)),
  ];

  let count = 0;

  console.log(matchPatterns);

  for (let y = 0; y < letters.length - 2; y++) {
    for (let x = 0; x < letters[y].length - 2; x++) {
      for (const matchPattern of matchPatterns) {
        let matches = true;
        for (let a = 0; a < matchPattern.length; a++) {
          for (let b = 0; b < matchPattern[a].length; b++) {
            if (
              matchPattern[a][b] !== "." &&
              matchPattern[a][b] !== letters[y + a][x + b]
            ) {
              matches = false;
            }
          }
        }
        if (matches) {
          count += 1;
        }
      }
    }
  }

  // 1984 - too low
  console.log(count);
}
