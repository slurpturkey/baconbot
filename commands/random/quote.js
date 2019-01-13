// Include required libraries
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');

const filePath = __dirname + "/../../pins.json";

// Creating a class for the quote command
class Quote extends commando.Command {

    constructor(client){

        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, "");
        }

        super(client, {
            name: 'quote',
            group: 'random', // The group in the help menu that the command is listed under
            memberName: 'quote',
            description: 'Returns a random pin' // Description of the command in the help menu
        });
    }

    // What happens when the command is run
    async run(message, args){

        if(args == "-l"){
            loadPins(message.channel);
            //message.client.on('channelPinsUpdate', async (updateChannel, date) => {await loadPins(updateChannel)});
            message.client.on('channelPinsUpdate', async (updateChannel, date) => {console.log("blah\n")});
        }else{

            await getPins(message.channel);

            // // Create an array to hold the result of getPins() in
            // let result = new Array();
            // // Set result equal to the returned value of getPins() passing in the server that the message was written on
            // result = await getPins(message.channel.guild);
            // // Chooses a random message object from the 'result' array returned by getPins()
            // var randMessage = result[Math.floor(Math.random() * result.length)];
            // // Sends an embedded message with the info from the randomly selected message object
            // message.channel.send({embed: {
            //     color: 0x139efb, // Lightish blue bar down the side
            //     author: {
            //         name: randMessage.member.nickname, // Nickname of the author of the pinned message
            //         icon_url: randMessage.author.avatarURL // Avatar of the author of the pinned message
            //     },
            //     description: randMessage.content // The content of the pinned message
            // }});
        }
    }
    
}

// The function that returns a single array of all the pinned messages on the server
async function loadPins(channel){
    console.log("Loading pins");

    let mes = new Discord.Collection(); // Placeholder Collection containing pinned messages for a specific channel iteration
    let messageCollection = new Discord.Collection(); // Master Collection containing all pinned messages - is returned at the end
    let guild = channel.guild;
    let messageArray = new Array();
    let objectArray;

    // Iterates through all the channels in the server
    let iter = guild.channels[Symbol.iterator]();
    for(let i of iter){
        // Checks to see if the channel is a TextChannel object
        if(i[1].type == "text"){
            // Assigns the result of fetchPinnedMessages() for the current channel to 'mes'
            mes = await i[1].fetchPinnedMessages();
            // Iterates through 'mes' and assigns the objects to messageCollection (Not quite sure how this bit works tbh but it does so w/e)
            //let cIter = mes.keys();
            //for(let j of cIter){
            messageCollection = await messageCollection.concat(mes);
            //console.log(mes.get('438033399945494530'));
            //}
        }
    }

     messageArray = await messageCollection.array();
     objectArray = new Array();

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

    await fs.writeFile(filePath, JSON.stringify(objectArray), function(error){
        if(error) throw error;
        //console.log("done");
        //console.log(messageCollection.array());
    });

    console.log("done loading pins");
}

async function parsePins(data, channel){

    //console.log(typeof data);
    let obj = JSON.parse(data);

    // Chooses a random message object from the 'result' array returned by getPins()
    var randMessage = obj[Math.floor(Math.random() * obj.length)];
    // Sends an embedded message with the info from the randomly selected message object

    channel.send({embed: {
        color: 0x139efb, // Lightish blue bar down the side
        author: {
            name: randMessage.user.name, // Nickname of the author of the pinned message
            icon_url: randMessage.user.avatar // Avatar of the author of the pinned message
        },
        description: randMessage.content // The content of the pinned message
    }});

}

// The function that returns a single array of all the pinned messages on the server
async function getPins(channel){

    let list = new Discord.Collection();
    list = await fs.readFile(filePath, 'utf8', function(error, data){
        if(error) console.log(error);
        parsePins(data, channel);
        return data;
    });

    // let mes = new Discord.Collection(); // Placeholder Collection containing pinned messages for a specific channel iteration
    // let messageCollection = new Discord.Collection(); // Master Collection containing all pinned messages - is returned at the end

    // // Iterates through all the channels in the server
    // let iter = guild.channels[Symbol.iterator]();
    // for(let i of iter){
    //     // Checks to see if the channel is a TextChannel object
    //     if(i[1].type == "text"){
    //         // Assigns the result of fetchPinnedMessages() for the current channel to 'mes'
    //         mes = await i[1].fetchPinnedMessages();
    //         // Iterates through 'mes' and assigns the objects to messageCollection (Not quite sure how this bit works tbh but it does so w/e)
    //         let cIter = mes[Symbol.iterator]();
    //         for(let j of cIter){
    //             messageCollection = await messageCollection.concat(mes);
    //         }
    //     }
    // }

    // // Returns a complete array of all pinned messages in the server
    // return messageCollection.array();

}

module.exports = Quote;