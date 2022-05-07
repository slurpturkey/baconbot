const commando = require('discord.js-commando');
const fs = require('fs');
const request = require('request');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.wordnik_key;
const URL = "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key="

class WordOfTheDay extends commando.Command {
    constructor(client){
        super(client, {
            name: 'wotd',
            group: 'dictionary',
            memberName: 'wotd',
            description: 'Word of the Day'
        });
    }

    async run(message, args){

        request(URL + key, {json: true}, function(err, res, body){
            if(err) throw err;
            parse(body, message);
        });

        //message.channel.send("Go do something else while you wait asshole.");
    }
}

function parse(body, message){
    let word = body.word;
    let part;
    let def;
    let eg;
    let origin;
    if(body.word)
        word = body.word;
    else 
        word = "There is no word of the day today.";
    if(body.examples)
        eg = body.examples[0].text;
    else
        eg = "No example provided.";
    if(body.note)
        origin = body.note;
    else
        origin = "No origin provided.";
    if(body.definitions[0].partOfSpeech)
        part = body.definitions[0].partOfSpeech;
    else
        part = "No part of speech provided.";
    if(body.definitions[0].text)
        def = body.definitions[0].text;
    else
        def = "No definition provided.";
    
    write(word, part, def, eg, origin, message);
}

function write(word, part, def, eg, origin, message){
    message.channel.send({embed: {
        title: "Word of the Day",
        description: "**__" + word + "__** (" + part + ")",
        color: 0x09aa03, // green
        footer: {
            icon_url: message.guild.me.user.avatarURL,
            text: message.guild.me.nickname
        },
        fields: [
            {
                name: "Definition",
                value: def
            },
            {
                name: "Example",
                value: eg
            },
            {
                name: "Origin",
                value: origin
            }
        ]
    }})
}

module.exports = WordOfTheDay;