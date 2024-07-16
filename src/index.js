const Client = require("./classes/client");
require("dotenv").config()

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  failIfNotExists: false,
});

// load commands, slash, events
require("./handler/commands")(client);
require("./handler/slash")(client);
require("./handler/events")(client);

client.login(process.env.TOKEN);