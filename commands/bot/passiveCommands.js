const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    currentChannelID: function(guild){
        let latestChannel = 0;
        guild.channels.forEach(function(channel){
            if(channel.type == 'text'){
                latestChannel = channel.id;
                if(channel.createdTimestamp > latestChannel.createdTimestamp) latestChannel = channel.id;
            }
        })
        return latestChannel;
    },

    loadPins: async function(channel){
        console.log("Loading Pins...");

        let pinsPath = __dirname + "/../../pins.json";

        let channelMessages = new Discord.Collection();
        let messageCollection = new Discord.Collection();
        let guild = channel.guild;
        let messageArray = new Array();
        let objectArray = new Array();

        let iter = guild.channels[Symbol.iterator]();
        for(let i of iter){
            if(i[1].type == 'text'){
                channelMessages = await i[1].fetchPinnedMessages();
                messageCollection = await messageCollection.concat(channelMessages);
            }
        }

        messageArray = await messageCollection.array();

        for(let i = 0; i < messageArray.length; i++){
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
            else continue;
        }

        await fs.writeFile(pinsPath, JSON.stringify(objectArray), function(error){
            if(error) throw error;
        });

        console.log("Pins Loaded!");
    },

    getAllChannels: async function(guild){
        return guild.channels;
    }
}