const commando = require('discord.js-commando');

class Woke extends commando.Command {
    constructor(client){
        super(client, {
            name: 'woke',
            group: 'random',
            memberName: 'woke',
            description: 'Woke'
        });
    }

    async run(message, args){
        message.channel.send("Hold on a fucking day or two, goddamn.");
        
    }
}

module.exports = Woke;