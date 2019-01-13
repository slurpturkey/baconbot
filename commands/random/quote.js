const commando = require('discord.js-commando');
const passiveCommands = require('../bot/passiveCommands');

class Quote extends commando.Command {
    constructor(client){
        super(client, {
            name: 'quote',
            group: 'random',
            memberName: 'quote',
            description: 'Returns a random pin'
        });
    }

    async run(message, args){
        
        if(args == "-l") passiveCommands.loadPins(message.channel)
        else{
            let channelCollection = passiveCommands.getAllChannels(message.channel.guild); // pick up here. trying to find an easier way to collect all pins into file.
        }

        message.channel.send("Be patient you turd.");

    }
}

module.exports = Quote;