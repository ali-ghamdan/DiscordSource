const path = require("path");
const loader = require("./loader");
const ClientSlashCommand = require("../classes/slashCommand");
const Client = require("../classes/client");

module.exports =
  /**
   *
   * @param {Client} client
   */
  function (client) {
    return loader(
      path.join(__dirname, "..", "commands", "slash"),
      /**
       *
       * @param {ClientSlashCommand} data
       * @param {string} file
       */
      (data, file) => {
        if (client.slashCommands.has(data.options.name)) {
          console.warn(
            `'${data.options.name}' Slash Command Already Loaded, OverWriting With (${file})`
          );
        }
        client.slashCommands.set(data.options.name, data);
        console.log(`'${data.options.name}' Slash Command Loaded.`);
      }
    );
  };
