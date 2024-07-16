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
    if (!message.content.startsWith(client.prefix)) return;
    const [commandName, ...args] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(" ");

    const command = client.getCommand(commandName);
    if (command) {
      if (command.options.botPermissions.length > 0) {
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
      if (command.options.userPermissions.length > 0) {
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
