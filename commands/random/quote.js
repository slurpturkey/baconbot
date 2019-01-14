const commando = require('discord.js-commando');
const passiveCommands = require('../bot/passiveCommands');
const Discord = require('discord.js');
const fs = require('fs');

const filePath = __dirname + "/../../pins.json";

var running = false;

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
            let channelCollection = await passiveCommands.getAllChannels(message.channel.guild); // pick up here. trying to find an easier way to collect all pins into file.
            channelCollection.forEach(async function(channel){
                if(channel.type == 'text' && running == false){
                    running = true;
                    await passiveCommands.loadPins(channel);
                }
                running = false;
            });
            parsePins(message.channel);
        }

        //message.channel.send("Be patient you turd.");

    }

}

async function parsePins(channel){
    let pins = new Discord.Collection();
    pins = await fs.readFile(filePath, 'utf8', function(error, data){
        if(error) throw error;
        let json = JSON.parse(data);
        var randMessage = json[Math.floor(Math.random() * json.length)];
        channel.send({embed: {
            color: 0x139efb, // Lightish blue bar down the side
            author: {
                name: randMessage.user.name, // Nickname of the author of the pinned message
                icon_url: randMessage.user.avatar // Avatar of the author of the pinned message
            },
            description: randMessage.content // The content of the pinned message
        }});
    });
}

module.exports = Quote;