// Imports
import { Client, Message } from "discord.js";
import { prefix, token } from "./config.json";

// Definitions
const client: Client = new Client();

// Ready event
client.on("ready", () => {
    console.log("Bot started");
});

// Message event
client.on("message", async (message: Message) => {
    if (message.content == `${prefix}ping`) {
        return message.channel.send(`:pong: Ping! O-O \`${client.ws.ping}\` :pong:`);
    }
});

// Error handling
client.on("error", console.error);

// Login
client.login(token);