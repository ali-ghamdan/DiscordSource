const path = require("path");
const loader = require("./loader");
const clientEvent = require("../classes/clientEvent");
const Client = require("../classes/client");

module.exports =
  /**
   *
   * @param {Client} client
   */
  function (client) {
    return loader(
      path.join(__dirname, "..", "events"),
      /**
       *
       * @param {clientEvent} data
       * @param {string} file
       */
      (data, file) => {
        if (client.events.has(data.eventName)) {
          console.warn(
            `'${data.eventName}' Event Already Loaded, OverWriting With (${file})`
          );
        }
        client[data.once ? "once" : "on"](data.eventName, (...args) =>
          data.run(client, ...args)
        );
        client.events.set(data.eventName, data);
        console.log(`'${data.eventName}' Event Loaded.`);
      }
    );
  };
