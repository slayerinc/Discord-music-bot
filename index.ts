// Imports
import { Client, Message, Collection } from "discord.js";
import { readdir } from "fs";

// requires
const config = require("./config.json");

// Definitions
const client: Client = new Client();

// Collections
const commands = new Collection();

// Command Handler
readdir("./commands/", (err: NodeJS.ErrnoException, files: string[]) => {
    if (err) {
        console.error(err);
    }

    const jsfile = files.filter(file => file.endsWith(".ts"));

    if (jsfile.length === 0) {
        return console.error("Error: No commands found");
    }

    jsfile.map(file => {
        const pull = require(`./commands/${file}`);
        commands.set(pull.conf.name, pull);
        console.log(`Setup command [${pull.conf.name}.js]`);
    });
});

// Ready event
client.on("ready", () => {
    console.log("Bot started");
});

// Message event
client.on("message", async (message: Message) => {
    if (!message.content.startsWith(config.prefix)) return;
    if (!message.guild) return;
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    const command = require(`./commands/${cmd}`);

    if (!command) return;

    command.execute(client, message, args);
});

// Error handling
client.on("error", console.error);

// Login
client.login(config.token);

// npx ts-node index.ts