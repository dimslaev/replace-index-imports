// Filename: replace-imports.js
// Timestamp: 2018.03.30-00:51:52 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const acorn = require("acorn");
const { log } = require("console");

module.exports = (content, replacements) =>
  acorn
    .parse(content, {
      sourceType: "module",
      allowImportExportEverywhere: true,
    })
    .body.reverse()
    .reduce((content, spec) => {
      if (
        spec.type === "ImportDeclaration" &&
        replacements.includes(spec.source.value)
      ) {
        const quote = spec.source.raw.indexOf("'") === 0 ? "'" : '"';
        const replace = spec.specifiers.reduce((acc, curr, index) => {
          acc += `import ${curr.imported.name} from ${quote}${spec.source.value}/${curr.imported.name}${quote};`;
          if (index !== spec.specifiers.length - 1) acc += "\n";
          return acc;
        }, "");
        const replaced = content.substring(spec.start, spec.end);

        log(replaced);

        content = content.replace(replaced, replace);
      }

      // log(content);
      return content;
    }, content);
