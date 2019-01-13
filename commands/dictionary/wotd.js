const commando = require('discord.js-commando');

class WordOfTheDay extends commando.Command {
    constructor(client){
        super(client, {
            name: 'wotd',
            group: 'random',
            memberName: 'wotd',
            description: 'Word of the Day'
        });
    }

    async run(message, args){
        message.channel.send("Go do something else while you wait asshole.")
        
    }
}

module.exports = WordOfTheDay;