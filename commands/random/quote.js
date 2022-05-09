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
            parsePins(message.channel);
            //await passiveCommands.loadPins(message.channel);
        }

        //message.channel.send("Be patient you turd.");

    }

}

function parsePins(channel){
    let pins = new Discord.Collection();
    pins = fs.readFile(filePath, 'utf8', async function(error, data){
        if(error) throw error;
        let json = JSON.parse(data);
        console.log(json);
        var randMessage = json[Math.floor(Math.random() * json.length)];
         try{
            channel.send({embed: {
                color: 0x139efb, // Lightish blue bar down the side
                author: {
                    ...(randMessage) && {name: randMessage.user.name}, // Nickname of the author of the pinned message
                    ...(randMessage) && {icon_url: randMessage.user.avatar} // Avatar of the author of the pinned message
                },
                // If message has been deleted but pins haven't been reloaded, default behaviour is to jump anyway to the location of where the message was.
                ...(randMessage) && {description: randMessage.content + "\n\n" + "[Go to original](https://discordapp.com/channels/" + randMessage.guildID + "/" + randMessage.channelID + "/" + randMessage.id + ")" }, // The content of the pinned message
                image: {
                    ...(randMessage) && {url: randMessage.attach}
                }
            }});
         } catch (e) {
             console.log(e);
         }
    });
}

module.exports = Quote;