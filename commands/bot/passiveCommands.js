const Discord = require('discord.js');
const fs = require('fs');

// TODO: instead of just getting pins from channels and rewriting the file every time, parse the text file first and then compare JSONs and 
// if there's a difference, then rewrite

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

        
        let pinsPath = __dirname + "/../../pins.json";
        
        let channelMessages = new Discord.Collection();
        let messageCollection = new Discord.Collection();
        let guild = channel.guild;
        let messageArray = new Array();
        let objectArray = new Array();
        
        let iter = guild.channels[Symbol.iterator]();
        for(let i of iter){
            if(i[1].type == 'text'){
                console.log("Loading " + i[1].name + " channel...");

                if(i[1].permissionsFor(guild.me).hasPermission('VIEW_CHANNEL')){
                    channelMessages = await i[1].fetchPinnedMessages();
                    messageCollection = await messageCollection.concat(channelMessages);
                    console.log(i[1].name + " channel found!");
                }else{
                    console.log("Insufficient permissions to access " + i[1].name + " channel...");
                }

            }
        }

        messageArray = await messageCollection.array();

        for(let i = 0; i < messageArray.length; i++){
            if(messageArray[i].member){

                if(messageArray[i].author.bot != true && messageArray[i].attachments.size == 0){
                    await objectArray.push({
                        content: messageArray[i].content,
                        user: {
                            name: messageArray[i].member.nickname,
                            avatar: messageArray[i].author.avatarURL
                        },
                        attach: ""
                    });
                }
                else if(messageArray[i].author.bot == true && messageArray[i].attachments.size == 0){
                    await objectArray.push({
                        content: messageArray[i].embeds[0].description,
                        user: {
                            name: messageArray[i].member.nickname,
                            avatar: messageArray[i].author.avatarURL
                        },
                        attach: ""
                    });
                }
                else if(messageArray[i].author.bot != true && messageArray[i].attachments.size > 0){
                    await objectArray.push({
                        content: messageArray[i].content,
                        user: {
                            name: messageArray[i].member.nickname,
                            avatar: messageArray[i].author.avatarURL
                        },
                        attach: messageArray[i].attachments.first().url
                    });
                }
                else if(messageArray[i].author.bot == true && messageArray[i].attachments.size > 0){
                    await objectArray.push({
                        content: messageArray[i].embeds[0].description,
                        user: {
                            name: messageArray[i].member.nickname,
                            avatar: messageArray[i].author.avatarURL
                        },
                        attach: messageArray[i].attachments.first().url
                    });
                }
            }
            else continue;
        }

        await fs.writeFile(pinsPath, JSON.stringify(objectArray), function(error){
            if(error) throw error;
        });

        return 0;
    },

    getAllChannels: async function(guild){
        return guild.channels;
    }
}