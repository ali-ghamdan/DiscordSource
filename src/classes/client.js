const { Client: DiscordClient, Collection } = require("discord.js");
const clientCommand = require("./command");
const clientSlashCommand = require("./slashCommand");
const clientEvent = require("./clientEvent");

class Client extends DiscordClient {
  /**
   *
   * @param {import("discord.js").ClientOptions} options
   * @param {object} additionalOptions
   * @param {string | undefined} additionalOptions.prefix if not provided message commands will never work
   * @param {string | undefined} additionalOptions.botsOwner set the bot's owner id, may throw an erro if not provided with ownerOnly command
   * @param {Array<string> | undefined} additionalOptions.botsDevs set bot's developers, can be used for DevelopersOnly Commands
   * @param {Array<string> | undefined} additionalOptions.allowedGuilds if exists the slash commands will only loaded in these guilds only, if not global load will be.
   * @param {"LEAVE" | "NO_RESPONSE"} additionalOptions.deniedGuildsAction only works when allowedGuilds exists
   */
  constructor(options, additionalOptions) {
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
    /**
     * @type {typeof additionalOptions}
     */
    this.additionalOptions = additionalOptions;
    this.prefix = this.additionalOptions.prefix;
  }

  getCommand(cmd) {
    let command = this.commands.get(cmd);
    if (!command) command = this.commands.get(this.aliases.get(cmd));
    return command;
  }
}

module.exports = Client;
