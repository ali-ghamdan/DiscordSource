const { Client: DiscordClient, Collection } = require("discord.js");
const clientCommand = require("./command");
const clientSlashCommand = require("./slashCommand");
const clientEvent = require("./clientEvent");

class Client extends DiscordClient {
  /**
   *
   * @param {import("discord.js").ClientOptions} options
   */
  constructor(options) {
    super(options);

    /**
     * @type {Collection<string, clientCommand>}
     */
    this.commands = new Collection();
    /**
     * @type {Collection<string, string>}
     */
    this.aliases = new Collection();
    /**
     * @type {Collection<string, clientSlashCommand>}
     */
    this.slashCommands = new Collection();
    /**
     * @type {Collection<string, clientEvent>}
     */
    this.events = new Collection();

    this.GUILDS = new Set(
      process.env.GUILDS?.split(",")?.map((e) => e?.trim())
    );
    this.DEVS = new Set(process.env.DEVS?.split(",")?.map((e) => e?.trim()));
    this.prefix = process.env.PREFIX || "!";
  }

  getCommand(cmd) {
    let command = this.commands.get(cmd);
    if (!command) command = this.commands.get(this.aliases.get(cmd));
    return command;
  }
}

module.exports = Client;
