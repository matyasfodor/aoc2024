import { readFileSync } from "fs";
import path from "path";

const part1 = true;
const lines = readFileSync(path.join(import.meta.dirname, "input.txt"), {
  encoding: "utf-8",
});

const reports = lines
  .split("\n")
  .filter((line) => !!line)
  .map((line: string) => line.split(/\s+/).map((e) => parseInt(e.trim())));

const enum State {
  Increasing,
  Decreasing,
  Error,
}

const getState = (
  elem: number,
  prevElem: number,
  increasing: State | null
): State => {
  const diff = elem - prevElem;
  const absDiff = Math.abs(diff);
  const safe = 0 < absDiff && absDiff < 4;
  const currentState = diff < 0 ? State.Decreasing : State.Increasing;
  const state = !safe
    ? State.Error
    : increasing === null
    ? currentState
    : increasing === currentState
    ? currentState
    : State.Error;
  return state;
};

const resp = reports.filter((report) => {
  const { diffs } = report.reduce<{ prevElem: number | null; diffs: number[] }>(
    ({ prevElem, diffs }, elem) => {
      if (prevElem === null) {
        return { prevElem: elem, diffs };
      }
      return {
        prevElem: elem,
        diffs: [...diffs, elem - prevElem],
      };
    },
    { prevElem: null, diffs: [] }
  );
  return diffs.every(
    (e) => e * diffs[0] > 0 && 0 < Math.abs(e) && Math.abs(e) < 4
  );
}).length;

console.log(`Number of safe reports ${resp}`);
