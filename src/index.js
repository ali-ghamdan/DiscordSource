const Client = require("./classes/client");
require("dotenv").config()

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  failIfNotExists: false,
}, {
  // env would work 2
  // allowedGuilds: ["1","2","3"],
  // deniedGuildsAction: "LEAVE",
  // botsDevs: ["1","2","3"],
  botsOwner: "1234",
  prefix: "1"
});

// load commands, slash, events
require("./handler/commands")(client);
require("./handler/slash")(client);
require("./handler/events")(client);

client.login(process.env.TOKEN);