const fs = require("fs");
const path = require("path");
const { readDirectory } = require("../utils/utils");

function loader(directory, cb) {
  for (let file of readDirectory(directory)) {
    const data = require(file);
    cb(new data(), file)
  }
}

module.exports = loader;