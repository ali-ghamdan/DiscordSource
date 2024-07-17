const { Message, GuildMember } = require("discord.js");
const Client = require("../classes/client");
const clientEvent = require("../classes/clientEvent");

module.exports = class extends clientEvent {
  constructor() {
    super("messageCreate");
  }

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */
  async run(client, message) {
    if (message.author.bot || !message.inGuild()) return;
    if (client.additionalOptions.allowedGuilds?.length > 0) {
      if (!client.additionalOptions.allowedGuilds?.includes(message.guildId)) {
        if (client.additionalOptions.deniedGuildsAction === "NO_RESPONSE")
          return;
        else return await message.guild.leave().catch(() => {});
      }
    }
    const [commandName, ...args] = message.content
      .slice(client.prefix?.length || 0)
      .trim()
      .split(" ");

    const command = client.getCommand(commandName);
    if (
      !message.content.startsWith(client.prefix) ||
      (!client.prefix && command)
    )
      return;
    if (command) {
      if (command.options.data.permissions.bot.length > 0) {
        let misPerms = this.missingPermissions(
          message.member,
          command.options.botPermissions
        );
        if (misPerms.length > 0) {
          await message.reply({
            content: `I want \`${misPerms.join(", ")}\` Permissions`,
          });
          return;
        }
      }
      if (command.options.data.permissions.user.length > 0) {
        let misPerms = this.missingPermissions(
          message.member,
          command.options.userPermissions
        );
        if (misPerms.length > 0) {
          await message.reply({
            content: `You want \`${misPerms.join(", ")}\` Permissions`,
          });
          return;
        }
      }
      if (command.options.data.ownerOnly) {
        if (!client.additionalOptions.botsOwner)
          throw new TypeError(
            `${command.commandName} is only for bot owner but owner id is ${client.additionalOptions.botsOwner}`
          );
        if (message.author.id !== client.additionalOptions.botsOwner) return;
      }
      if (command.options.data.developersOnly) {
        if (!client.additionalOptions.botsDevs?.includes(message.author.id))
          return;
      }
      await command.run(client, message, args);
    }
  }

  /**
   *
   * @param {GuildMember} member
   * @param {import("discord.js").PermissionResolvable} perms
   */
  missingPermissions(member, perms) {
    if (member.permissions.has(perms)) return [];
    else {
      return member.permissions
        .toArray()
        .filter((p) => perms.includes(p) && !member.permissions.has(p));
    }
  }
};
