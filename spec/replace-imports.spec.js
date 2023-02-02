let replaceimports = require("../");

describe("replaceimports", () => {
  const singleQuoteContent = "import { exportB, exportC } from 'moduleA';";
  const doubleQuoteContent = 'import { exportB, exportC } from "moduleA";';
  const fullFile =
    'import something from "somewhere";\nimport { exportB, exportC } from "moduleA";\nimport somethingElse from "somewhereElse";\nconst someVar = "";';

  it("should return true", () =>
    expect(replaceimports(singleQuoteContent, ["moduleA"])).toBe(
      "import exportB from 'moduleA/exportB';\nimport exportC from 'moduleA/exportC';"
    ));

  it("should return true", () =>
    expect(replaceimports(doubleQuoteContent, ["moduleA"])).toBe(
      'import exportB from "moduleA/exportB";\nimport exportC from "moduleA/exportC";'
    ));

  it("should return true", () =>
    expect(replaceimports(fullFile, ["moduleA"])).toBe(
      'import something from "somewhere";\nimport exportB from "moduleA/exportB";\nimport exportC from "moduleA/exportC";\nimport somethingElse from "somewhereElse";\nconst someVar = "";'
    ));
});
