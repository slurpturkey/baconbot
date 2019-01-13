const commando = require('discord.js-commando');

class News extends commando.Command {
    constructor(client){
        super(client, {
            name: 'news',
            group: 'random',
            memberName: 'news',
            description: 'News'
        });
    }

    async run(message, args){
        message.channel.send("Impatient twat.");
        
        
    }
}

module.exports = News;