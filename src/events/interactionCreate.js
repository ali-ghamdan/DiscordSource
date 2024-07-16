const Client = require("../classes/client");
const clientEvent = require("../classes/clientEvent");

module.exports = class extends clientEvent {
  constructor() {
    super("interactionCreate");
  }

  /**
   *
   * @param {Client} client
   * @param {import("discord.js").Interaction} interaction
   */
  async run(client, interaction) {
    if (interaction.user.bot || !interaction.inGuild()) return;
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);
      if (command) {
        command.run(client, interaction);
      }
    }
  }
};
