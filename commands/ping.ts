// Imports
import { Client, Message, MessageEmbed } from "discord.js";

// Requires
const config = require("../config.json");

// Config
module.exports.conf = {
    name: "ping",
    description: "Receive the api ping in ms",
}

// Execute
module.exports.execute = async (client: Client, message: Message) => {
    const msgembed: MessageEmbed = new MessageEmbed();
    msgembed.setColor("RED");
    msgembed.setTitle(":ping_pong: Ping! :ping_pong:");
    msgembed.setDescription(`Api ping: \`${client.ws.ping}ms\``);
    msgembed.setTimestamp();
    msgembed.setFooter(config.footer);

    await message.channel.send(msgembed);
}