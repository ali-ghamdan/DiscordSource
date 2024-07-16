const path = require("path");
const loader = require("./loader");
const clientCommand = require("../classes/command");
const Client = require("../classes/client");

module.exports =
  /**
   *
   * @param {Client} client
   */
  function (client) {
    return loader(
      path.join(__dirname, "..", "commands", "message"),
      /**
       *
       * @param {clientCommand} data
       * @param {string} file
       */
      (data, file) => {
        if (client.commands.has(data.commandName)) {
          console.warn(
            `'${data.commandName}' Command Already Loaded, OverWriting With (${file})`
          );
        }
        client.commands.set(data.commandName, data);
        if (data.options.aliases.length > 0) {
          for (let alias of data.options.aliases) {
            client.aliases.set(alias, data.commandName);
          }
        }
        console.log(`'${data.commandName}' Command Loaded.`);
      }
    );
  };
