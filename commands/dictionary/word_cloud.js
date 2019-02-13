const commando = require('discord.js-commando');

class WordCloudCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'wordcloud',
            group: 'dictionary',
            memberName: 'wordcloud',
            description: 'Generates a word cloud from the past 100 messages.'
        });
    }

    async run(message, args){
        
    }
}

module.exports = WordCloudCommand;