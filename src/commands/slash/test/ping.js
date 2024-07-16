const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} = require("discord.js");
const clientSlashCommand = require("../../../classes/slashCommand");

module.exports = class extends clientSlashCommand {
  constructor() {
    super({
      name: "ping",
      description: "reply with PONG! Slash Message",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "hidden",
          description: "if you want to send an ephemeral Message",
          type: ApplicationCommandOptionType.Boolean,
          required: true,
        },
      ],
    });
  }

  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns {Promise<any>}
   */
  async run(client, interaction) {
    let hidden = interaction.options.getBoolean("hidden", true);
    await interaction.reply({
      content: "PONG!",
      ephemeral: hidden,
    });
  }
};
