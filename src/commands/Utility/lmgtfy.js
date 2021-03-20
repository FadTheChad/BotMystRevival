const Discord = require("discord.js");
const {
    SuccessColor,
    Prefix
} = require('../../config.json');

module.exports = {
    name: "lmgtfy",
    description: "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.",
    aliases: ['lmgt'],
    category: "Utility",
    usage: `${Prefix}lmgtfy How to make a discord bot`,
    
    execute: async function(client, message, args) {
    
        //Manipulate string so it can be placed in middle of URL
        const search = args.join(" ");
        var replaced = search.split(' ').join('+');

        //Make an embed and set the Title URL to https://lmgtfy.com + our manipulated string.
        const lmgtfyEmbed = new Discord.MessageEmbed()
            .setTitle("Heres what i could find for: " + search)
            .setURL('https://lmgtfy.com/?q=' + replaced)
            .setTimestamp(Date.now())
            .setColor(SuccessColor);
      
        message.channel.send(lmgtfyEmbed);
    }

}