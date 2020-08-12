// Imports
import { Client, Message, MessageEmbed } from "discord.js";

// Requires
const config = require("../config.json");

// Config
module.exports.conf = {
    name: "help"
}

// Execute
module.exports.execute = async (client: Client, message: Message, args: String[]) => {
    const msgembed1: MessageEmbed = new MessageEmbed(), msgembed2: MessageEmbed = new MessageEmbed();

    if (!args[0]) {
        msgembed1.setColor("RED");
        msgembed1.setTitle("Help");
        msgembed1.addField(`${config.prefix}ping`, require("./ping").conf.description);
        msgembed1.setTimestamp();
        msgembed1.setFooter(config.footer);

        await message.channel.send(msgembed1);
    }else{
        switch (args[0]) {
            case "ping": {
                msgembed2.setColor("RED");
                msgembed2.setTitle("Help: ping");
                msgembed2.setDescription(require("./ping").conf.description);
                msgembed2.setTimestamp();
                msgembed2.setFooter(config.footer);
                break;
            }
        }

        await message.channel.send(msgembed2);
    }
}