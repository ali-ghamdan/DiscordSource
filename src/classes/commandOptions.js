class CommandOptions {
  constructor() {
    /**
     * @type {string | undefined}
     */
    this.description = undefined;
    /**
     * @type {string[]}
     */
    this.aliases = [];
    /**
     * @type {import("discord.js").PermissionResolvable}
     */
    this.userPermissions = [];
    /**
     * @type {import("discord.js").PermissionResolvable}
     */
    this.botPermissions = [];
  }

  /**
   *
   * @param {string} desc
   */
  setDescription(desc) {
    this.description = desc;
    return this;
  }

  /**
   *
   * @param {string | string[]} aliases
   */
  setAliases(aliases) {
    this.aliases = (Array.isArray(aliases) ? aliases : [aliases]).filter(
      (x) => typeof x === "string"
    );
    return this;
  }

  /**
   *
   * @param {import("discord.js").PermissionResolvable} perms
   */
  setUserPermissions(perms) {
    this.userPermissions = perms;
  }

  /**
   *
   * @param {import("discord.js").PermissionResolvable} perms
   */
  setBotPermissions(perms) {
    this.botPermissions = perms;
  }
}

module.exports = CommandOptions;
