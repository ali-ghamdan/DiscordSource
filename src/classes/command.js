const { Message } = require("discord.js");
const Client = require("./client");
const commandOptions = require("./commandOptions");

class clientCommand {
  /**
   *
   * @param {string} commandName
   * @param {commandOptions} options
   */
  constructor(commandName, options) {
    this.commandName = commandName;
    this.options = options;
  }

  /**
   *
   * @param {Client} client
   * @param  {Message} message
   * @param  {Array<string>} args
   * @returns {Promise<any>}
   */
  async run(client, message, args) {}
}

module.exports = clientCommand;
