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
            description: 'Returns the word of the day'
        });
    }

    async run(message, args){
        request(URL + key, {json: true}, (err, res, body) => {
            if(err) {return console.log(err); }
            parse(body, message);
        });
    }

}

function parse(body, message){
    let word = body.word;
    let part = body.definitions[0].partOfSpeech;
    let def = body.definitions[0].text;
    let eg = body.examples[0].text;
    let origin = body.note;

    write(word, part, def, eg, origin, message);
}

function write(word, part, def, eg, origin, message){
    message.channel.send({embed: {
        "title": "Word of the Day",
        "description": "**__" + word + "__** (" + part + ")",
        "color": 0x09aa03, // green
        "footer": {
        "icon_url": message.guild.me.user.avatarURL,
        "text": message.guild.me.nickname,
        },
        "fields": [
        {
            "name": "Definition",
            "value": def
        },
        {
            "name": "Example",
            "value": eg
        },
        {
            "name": "Origin",
            "value": origin
        }
        ]
    }});
}

module.exports = WordOfTheDay;