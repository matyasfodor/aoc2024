import { readFileSync } from "fs";
import path from "path";

const part1 = true;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const lines = input.split('\n').map((line) => line.split(''));

interface Coord {
  x: number;
  y: number;
}

const locations: Record<string, Coord[]> = {};

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    const value = lines[i][j];
    if (value !== '.') {
      if (!(value in locations)) {
        locations[value] = [];
      }
      locations[value].push({
        x: i,
        y: j,
      })
    }
  }
}


const pairwise = <T>(arr: T[]): T[][] => {
  const ret: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      ret.push([arr[i], arr[j]]);
    }
  }
  return ret;
};

const getDifference = (a: Coord, b: Coord): Coord => {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
  };
}

const getSum = (a: Coord, b: Coord): Coord => {
  return {
    x: b.x + a.x,
    y: b.y + a.y,
  };
}

const boundCheck = ({x, y}: Coord, bounds: Coord) => {
  return 0 <= x && 0 <= y && x < bounds.x && y < bounds.y;
}

const antinodeLocations: Coord[] = [];

const bounds: Coord = {
  x: lines.length,
  y: lines[0].length,
}

for (const [key, keyLocations] of Object.entries(locations)) {
  for (const [left, right] of pairwise(keyLocations)) {
    const distance = getDifference(left, right);
    const superLeft = getDifference(distance, left);
    const superRight = getSum(right, distance);
    if (boundCheck(superLeft, bounds)) {
      antinodeLocations.push(superLeft);
    }
    if (boundCheck(superRight,bounds)) {
      antinodeLocations.push(superRight);
    }
  }
}

for (const {x, y} of antinodeLocations) {
  lines[x][y] = '#';
}

for (const line of lines) {
  console.log(line.join(''));
}

const uniqueAntinodeLocations = new Set<string>();

for (const {x, y} of antinodeLocations) {
  uniqueAntinodeLocations.add(`${x}-${y}`);
}

console.log(uniqueAntinodeLocations.size);