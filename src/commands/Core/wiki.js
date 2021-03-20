const Util = require('../../modules/util')
const Logger = new Util.Logger();
const requests = require('../../modules/requests')
const {
    FailureColor, 
    Prefix
} = require('../../config.json');

module.exports = {
    name: 'wiki',
    description: 'Search something on Wikipedia with this command and get a short summary of it.',
    aliases: ['wikipedia'],
    usage: `${Prefix}wiki Lord Of The Rings [Gives A Short Summary from WikiPedia]"`,
    category: "Core",
    
    execute: async function(client, message, args) {
        {
            const command = args.join(" ");

            let requestLang = 'en'; //This is the Wikipedia language in which we send our request.
            if (!args[0]) {
                message.react('👎').catch(e => Logger.error(e))
                message.channel.send({
                    embed: {
                        color: FailureColor,
                        description: 'The command you gave was invalid or doesnt exist'
                    },
                })
            } else {
                //Using some regex to make the string understandable to the getWikipediaShortSummary() function.
                let searchValue = args.toString().replace(/,/g, ' ')
                searchValue = searchValue.replace('>' + command + ' ', '')
                //Call the getWikipediaShortSummary() function.
                requests.getWikipediaShortSummary(message, searchValue, requestLang).catch(e => Logger.error(e))
            }

        }
    }

}