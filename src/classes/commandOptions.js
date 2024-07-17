class CommandOptions {
  constructor() {
    /**
     * @type {{
     * description: string | undefined,
     * aliases: Array<string>,
     * permissions: {
     *  user: import("discord.js").PermissionResolvable,
     *  bot: import("discord.js").PermissionResolvable,
     * },
     * ownerOnly: boolean,
     * developersOnly: boolean
     * }}
     */
    this.data = {
      description: undefined,
      aliases: [],
      permissions: {
        user: [],
        bot: [],
      },
      ownerOnly: false,
      developersOnly: false,
    };
  }

  /**
   *
   * @param {string} desc
   */
  setDescription(desc) {
    this.data.description = desc;
    return this;
  }

  /**
   *
   * @param {string | string[]} aliases
   */
  setAliases(aliases) {
    this.data.aliases = (Array.isArray(aliases) ? aliases : [aliases]).filter(
      (x) => typeof x === "string"
    );
    return this;
  }

  /**
   *
   * @param {import("discord.js").PermissionResolvable} perms
   */
  setUserPermissions(perms) {
    this.data.permissions.user = perms;
    return this;
  }

  /**
   *
   * @param {import("discord.js").PermissionResolvable} perms
   */
  setBotPermissions(perms) {
    this.data.permissions.bot = perms;
    return this;
  }

  /**
   *
   * @param {boolean} v
   */
  onlyOwner(v) {
    this.data.ownerOnly = !!v;
    return this;
  }

  /**
   *
   * @param {boolean} v
   */
  onlyDevs(v) {
    this.data.developersOnly = !!v;
    return this;
  }
}

module.exports = CommandOptions;
