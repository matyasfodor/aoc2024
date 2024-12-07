import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const lines = input.split('\n').map((line) => line.split(''));

const obstacles = new Set<string>();
const visited = new Set<string>();

type Direction =  'U' | 'R' | 'D' | 'L';

interface Coord {
  x: number;
  y: number;
  direction: Direction;
}

const coordToHash = (coord: Coord) => `${coord.x}-${coord.y}-${coord.direction}`;

let currentPos: Coord | null= null;

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '#') {
      obstacles.add(`${i}-${j}`);
    } else if (lines[i][j] === '^') {
      currentPos = {x: i, y: j, direction: 'U'};
    }
  }
}

if (!currentPos) {
  throw new Error("Starting pos not defined");
}

const nextDirection: Record<Direction, Direction> = {
  'U': 'R',
  'R': 'D',
  'D': 'L',
  'L': 'U',
};

while (!visited.has(coordToHash(currentPos))) {
  let nextPos: Coord = {
    ...currentPos,
    x: currentPos.x + (currentPos.direction === 'U' ? -1 : currentPos.direction === 'D' ? 1 : 0),
    y: currentPos.y + (currentPos.direction === 'L' ? -1 : currentPos.direction === 'R' ? 1 : 0),
  };
   if (obstacles.has(`${nextPos.x}-${nextPos.y}`)) {
      nextPos = {
        ...currentPos,
        direction: nextDirection[currentPos.direction],
      };
   }
   visited.add(coordToHash(currentPos));

   if (nextPos.x < 0 || nextPos.x >= lines.length || nextPos.y < 0 || nextPos.y >= lines[nextPos.x]?.length) {
    console.log("visited",
      nextPos.x < 0,
      nextPos.x > lines.length,
      nextPos.y < 0,
      nextPos.y > lines[nextPos.x]?.length
    )
    break;
   }
   currentPos = nextPos;
}

const visitedPos = Array.from(visited.keys()).reduce((acc, e) => {
  const [a, b, _] = e.split('-');
  acc.add(`${a}-${b}`);
  return acc;
}, new Set<string>());

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (visitedPos.has(`${i}-${j}`)) {
      lines[i][j] = 'X';
    }
  }
  // console.log(lines[i].join(''));
}

console.log(visitedPos.size);