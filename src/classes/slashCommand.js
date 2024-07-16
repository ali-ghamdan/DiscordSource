const { Message, CommandInteraction } = require("discord.js");
const Client = require("./client");

class clientSlashCommand {
  /**
   *
   * @param {import("discord.js").ApplicationCommandData} options
   */
  constructor(options) {
    this.options = options;
  }

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @returns {Promise<any>}
   */
  async run(client, interaction) {}
}

module.exports = clientSlashCommand;
