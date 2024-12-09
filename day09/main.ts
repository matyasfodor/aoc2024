import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const input = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});


const { path: diskPath } = Array.from(input).reduce<{
  block: boolean;
  path: string[];
  id: number;
}>(
  ({ block, path, id }, c) => {
    const n = parseInt(c);
    return {
      block: !block,
      path:
        [...path, ...Array.from({ length: n }, () => `${block ? id : "."}`)],
      id: id + (block ? 0 : 1),
    };
  },
  {
    block: true,
    path: [],
    id: 0,
  }
);

let leftPtr = 0;
let rightPtr = diskPath.length - 1;
while (leftPtr < rightPtr) {
  if (diskPath[leftPtr] === '.') {
    while(diskPath[rightPtr] === '.') {
      rightPtr -= 1;
    }
    if (rightPtr < leftPtr) {
      break
    }
    diskPath[leftPtr] = diskPath[rightPtr];
    diskPath[rightPtr]='.'
  }
  leftPtr += 1;
}

const checksum = diskPath.reduce((acc, e, index) => {
    return acc + (e !== '.' ? parseInt(e) * index : 0);
  }, 0);

console.log(checksum)
