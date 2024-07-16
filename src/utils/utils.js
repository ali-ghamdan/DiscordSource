const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} dir
 * @returns {string[]}
 */
function readDirectory(dir) {
  let files = [];
  let folder = fs.readdirSync(path.resolve(dir), { withFileTypes: true });
  for (let i = 0; i < folder.length; i++) {
    let file = folder[i];
    if (file.isDirectory())
      files.push(...readDirectory(path.join(dir, file.name)));
    else files.push(path.join(dir, file.name));
  }

  return files;
}

module.exports = {
  readDirectory,
};
