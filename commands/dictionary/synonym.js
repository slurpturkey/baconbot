const commando = require('discord.js-commando');
const fs = require('fs');
const request = require('request');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.wordnik_key;
const URL1 = "https://api.wordnik.com/v4/word.json/"
const URL2 = "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key="

class SynonymCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'synonym',
            group: 'dictionary',
            memberName: 'synonym',
            description: 'Lists synonyms for the provided word'
        });
    }

    async run(message, args){

        request(URL1 + args + URL2 + key, {json: true}, function(err, res, body){
            if(err) throw err;

            let syn = "";

            for(let i = 0; i < body.length; i++){
                if(body[i].relationshipType == 'synonym') {
                    syn = body[i].words;
                    break;
                }
            }

            let synstr = syn.toString();
            synstr = synstr.replace(/,/g, ", ");

            if(syn == ""){
                message.channel.send({embed: {
                    color: 0xffaa33,
                    description: "Either the word was not found or there are no synonyms listed for it.",
                    footer: {
                        icon_url: message.guild.me.user.avatarURL,
                        text: message.guild.me.nickname
                    }
                }});
            }
            else{
                message.channel.send({embed: {
                    color: 0xffaa33,
                    fields: [
                        {
                            name: "Synonyms for *" + args + "*",
                            value: synstr
                        }
                    ],
                    footer: {
                        icon_url: message.guild.me.user.avatarURL,
                        text: message.guild.me.nickname
                    }
                }});
            }
        });

        //message.channel.send("Go do something else while you wait asshole.");
    }
}

module.exports = SynonymCommand;