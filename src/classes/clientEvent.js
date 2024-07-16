const Client = require("./client");

class clientEvent {
  /**
   * 
   * @param {keyof import("discord.js").ClientEvents} eventName 
   * @param {boolean} once 
   */
  constructor(eventName, once) {
    this.eventName = eventName;
    this.once = once;
  }

  /**
   * 
   * @param {Client} client 
   * @param  {...any} params 
   * @returns {Promise<any>}
   */
  async run(client, ...params) {}
}

module.exports = clientEvent;