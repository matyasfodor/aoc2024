import { readFileSync } from "fs";
import path from "path";

const part1 = false;
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

const isSafe = (report: number[]): boolean => {
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
};

const resp = reports.filter((report) => {
  let reportIsSafe = isSafe(report);
  if (!part1 && !reportIsSafe) {
    for (let i = 0; i < report.length; i++) {
      reportIsSafe =
        reportIsSafe || isSafe(report.filter((_, index) => index !== i));
    }
  }

  return reportIsSafe;
}).length;

console.log(`Number of safe reports ${resp}`);
