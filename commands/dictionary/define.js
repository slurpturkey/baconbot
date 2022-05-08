const commando = require('discord.js-commando');
const fs = require('fs');
var unirest = require('unirest');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));

class DefineCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'define',
            group: 'dictionary',
            memberName: 'define',
            description: 'Get Urban Dictionary Definition'
        });
    }

    async run(message, args){
        const req = unirest("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define");
        req.query({
            "term": args
        });
        req.headers({
            "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
            "X-RapidAPI-Key": auth.ud_key,
            "useQueryString": true
        });
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
        
            processData(res, message);
        });
    }
}

function processData(data, message){
    if(data.body){
        for(let i = 0; i < 9; i++){
            if(data.body.list[i]){
                let def = data.body.list[i].definition;
                if(def.length < 2000){
                    def = def.replace(/\[/g, '');
                    def = def.replace(/\]/g, '');

                    let eg = data.body.list[i].example;
                    if(eg){
                        eg = eg.replace(/\[/g, '');
                        eg = eg.replace(/\]/g, '');

                        message.channel.send({embed: {
                            color: 0xfbf72d,
                            title: data.body.list[i].word,
                            url: encodeURI("https://www.urbandictionary.com/define.php?term=" + data.body.list[0].word),
                            description: def,
                            fields: [{
                                name: "Example",
                                value: eg
                            }]
                        }});
                        break;
                    }
                    else {
                        message.channel.send({embed: {
                            color: 0xfbf72d,
                            title: data.body.list[i].word,
                            url: encodeURI("https://www.urbandictionary.com/define.php?term=" + data.body.list[0].word),
                            description: def
                        }});
                        break;
                    }
                }
                else continue;
            } 
            else{
                message.channel.send({embed: {
                    color: 0xfbf72d, // yellow
                    title: "Word not found",
                    description: "Please try a different word."
                }});
                break;
            }
        }
    }
    else {
        message.channel.send({embed: {
            color: 0xfbf72d,
            title: "Syntax error",
            description: "Please try a different word."
        }})
        console.log(data);
    }
}

module.exports = DefineCommand;