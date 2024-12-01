import { readFileSync } from "fs";
import path from "path";

const part1 = false;
const lines = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const { left, right } = lines.split("\n").reduce<{left: number[], right: number[]}>(
  ({ left, right }, line) => {
    if (!line) {
      return { left, right };
    }
    const [leftElem, rigthElem] = line.trim().split(/\s+/);
    left.push(parseInt(leftElem));
    right.push(parseInt(rigthElem));
    return { left, right };
  },
  { left: [], right: [] }
);

if (part1) {
  left.sort();
  right.sort();

  const diff = left.reduce((sumDiff, leftElem, i) => {
    const rigthElem = right[i];
    return sumDiff + Math.abs(leftElem - rigthElem);
  }, 0);

  console.log(diff);
}

const aggregator = (arr) =>
  arr.reduce((acc, e) => {
    if (Object.hasOwn(acc, e)) {
      acc[e] += 1;
    } else {
      acc[e] = 1;
    }
    return acc;
  }, {});

const rightAggregated = aggregator(right);

const similarity = left.reduce((acc, field) => {
  return acc + field * (rightAggregated[field] ?? 0);
}, 0);

console.log(similarity);
