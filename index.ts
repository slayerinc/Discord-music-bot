// Imports
import { Client, Message, Collection } from "discord.js";
import { prefix, token } from "./config.json";
import { readdir } from "fs";

// Definitions
const client: Client = new Client();

// Collections
const commands = new Collection();

// Command Handler
readdir("./commands/", (err: NodeJS.ErrnoException, files: string[]) => {
    if (err) {
        console.error(err);
    }

    const jsfile = files.filter(file => file.split(".").includes("js"));

    if (jsfile.length === 0) {
        return console.error("No commands found");
    }

    jsfile.map(file => {
        const pull = require(`./commands/${file}`);
        commands.set(pull.name, pull);
    });
});

// Ready event
client.on("ready", () => {
    console.log("Bot started");
});

// Message event
client.on("message", async (message: Message) => {
    if (message.content == `${prefix}ping`) {
        return message.channel.send(`:ping_pong: Ping! O-O \`${client.ws.ping}\` :ping_pong:`);
    }
});

// Error handling
client.on("error", console.error);

// Login
client.login(token);