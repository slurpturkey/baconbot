const commando = require('discord.js-commando');
const Discord = require('discord.js');
const request = require('snekfetch');
const fs = require('fs');
const name = require('./commands/bot/name');
const msg = require('./commands/bot/msg');

// auth file (saves from hard-coding keys)
const filePath = "discordauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// create bot user
const bot = new commando.Client({owner: auth.owner_id, unknownCommandResponse: false, nonCommandEditable: false});

// path of pins file
const pinsPath = __dirname + "/../../pins.json";

//TODO: find a way of getting the most recently updated channel.
let currentChannel;

// register commandsS
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('dictionary', 'Dictionary');
//bot.registry.registerGroup('test', 'Test');
bot.registry.registerCommandsIn(__dirname + "/commands");



// when bot starts, change name
bot.on('ready', function(){
    name.changeName(bot);
});

bot.on('error', function(){
    console.error();
});

// when a channel's pins are updated, reload pins for the whole guild and then set that channel to the current channel.
bot.on('channelPinsUpdate', async (channel, time) => {
    await loadPins(channel);
    currentChannel = channel;
});

bot.on('message', function(message){
    msg.loadMessage(message);
});

// every midnight, change name
setInterval(function(){
    let d = new Date();
    if(d.getMinutes() == 0 && d.getHours() == 0) name.changeName(bot); else return;
}, 1000 * 60);

// get all pins on server and dump them into a pins.json file.
async function loadPins(channel){
    console.log("Loading pins");

    let mes = new Discord.Collection(); // Placeholder Collection containing pinned messages for a specific channel iteration
    let messageCollection = new Discord.Collection(); // Master Collection containing all pinned messages - is returned at the end
    let guild = channel.guild; // the guild that the channel is in
    let messageArray = new Array(); // used for converting messageCollection into an array
    let objectArray = new Array();

    // Iterates through all the channels in the server
    let iter = guild.channels[Symbol.iterator]();
    for(let i of iter){
        // Checks to see if the channel is a TextChannel object
        if(i[1].type == "text"){
            // Assigns the result of fetchPinnedMessages() for the current channel to 'mes'
            mes = await i[1].fetchPinnedMessages();
            // Concatenates messageCollection with mes
            messageCollection = await messageCollection.concat(mes);
        }
    }

    // create a copy of messageCollection in Array format
    messageArray = await messageCollection.array();

    // iterates through all pinned messages, and checks if they were sent by either a user or a bot
    for(let i = 0; i < messageArray.length; i++){

        //console.log(tempObj);

        if(messageArray[i].member){
            if(messageArray[i].author.bot != true){
                await objectArray.push({
                    content: messageArray[i].content,
                    user: {
                        name: messageArray[i].member.nickname,
                        avatar: messageArray[i].author.avatarURL
                    }
                });
            }
            else{
                await objectArray.push({
                    content: messageArray[i].embeds[0].description,
                    user: {
                        name: messageArray[i].member.nickname,
                        avatar: messageArray[i].author.avatarURL
                    }
                });
            }
        }
        else{
            continue;
        }
        
     }



     //console.log(objectArray);

    // let obj = messageArray.reduce((obj, [key, value]) => (
    //     Object.assign(obj, {[key]: value})
    // ), {});

    await fs.writeFile(pinsPath, JSON.stringify(objectArray), function(error){
        if(error) throw error;
        //console.log("done");
        //console.log(messageCollection.array());
    });

    console.log("done loading pins");
}

bot.login(auth.bot_id);
const guildID = auth.guild_id;