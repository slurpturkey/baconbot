const commando = require('discord.js-commando');

var messageID;
var messageObject;
var messageContent;
var nick;

class PlaceHolder extends commando.Command {
    constructor(client){
        super(client, {
            name: 'placeholder',
            group: 'random',
            memberName: 'placeholder',
            description: 'Returns a random pin'
        });
    }

    run(message, args){
        var inArray = new Array();
        var outArray = new Array();
        var channelIDs = new Array();
        if(message.guild.available) findPins(message, inArray, channelIDs);
    }
}

function findPins(message, inArray, channelIDs){

    var iter = message.channel.guild.channels[Symbol.iterator]();
    for(let channel of iter){
        //console.log(channel[1].type);
        if(channel[1].type == 'text'){
            channelIDs.push(channel[1].id);
            outArray = getPin(channel[1], message, inArray);
        }
    }

    //console.log(channelIDs);
    //console.log(outArray);
    console.log("done!\n" + outArray);
}

function getPin(channel, message, inArray){
    let mes = channel.fetchPinnedMessages() // mes = a Promise
        .then(response => 
        {
            getMessage(response, inArray);
        })
        // .then(response =>
        // {
        //     sendMessage();
        // })
        .catch(console.error);
        
        
}

function getMessage(response, inArray){
    if(response.first() != null){

        var mesIter = response[Symbol.iterator]();
        for(let singleMessage of mesIter){
            inArray.push(singleMessage[1].content);
            console.log(singleMessage[1].content);
        }
        
        return inArray;
    }
    else return;
}

function sendMessage(){
    if(response != null){

        if(response.nickname != null) nick = response.nickname;
        else nick = messageObject.author.username;

        return message.channel.send("\"" + messageContent + "\" - " + nick);
    }
    else return message.channel.send("No pinned messages!");
}

module.exports = PlaceHolder;