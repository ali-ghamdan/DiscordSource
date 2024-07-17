const { Routes } = require("discord.js");
const Client = require("../classes/client");
const clientEvent = require("../classes/clientEvent");

module.exports = class extends clientEvent {
  constructor() {
    super("ready", true);
  }

  /**
   *
   * @param {Client} client
   */
  async run(client) {
    console.log("loading Slash Commands...");
    let commands = client.slashCommands.toJSON().map((e) => e.options);
    if (client.additionalOptions.allowedGuilds?.length > 0) {
      for (let guild of client.additionalOptions.allowedGuilds) {
        await client.rest
          .put(Routes.applicationGuildCommands(client.user.id, guild), {
            body: commands,
          })
          .then(() =>
            console.log(
              "SlashCommands Loaded in " +
                client.guilds.cache.get(guild)?.name || guild
            )
          )
          .catch(() => {});
      }
    } else {
      await client.rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });
    }
    console.log("Slash Commands Loaded");
    console.log(`${client.user.tag} is ready.`);
  }
};
