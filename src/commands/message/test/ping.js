const { Message } = require("discord.js");
const clientCommand = require("../../../classes/command");
const CommandOptions = require("../../../classes/commandOptions");
const Client = require("../../../classes/client");

module.exports = class extends clientCommand {
  constructor() {
    super(
      "ping", 
      new CommandOptions()
        .setDescription("reply with PONG! message")
        .setAliases([])
    )
  }

  /**
   *
   * @param {Client} client
   * @param  {Message} message
   * @param  {Array<string>} args
   * @returns {Promise<any>}
   */
  async run(client, message, args) {
    await message.reply({
      content: "PONG!"
    });
  }
}