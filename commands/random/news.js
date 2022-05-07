const commando = require('discord.js-commando');
const fs = require('fs');
const request = require('request');

const filePath = "vendorauth.json";
const keys = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const appID = keys.reddit_appID;
const secret = keys.reddit_secret;

class News extends commando.Command {
    constructor(client){
        super(client, {
            name: 'news',
            group: 'random',
            memberName: 'news',
            description: 'So much breaking news your screen will crack (I\'m ugly now because reddit blocked me from getting the preview images)'
        });
    }

    async run(message, args){
        
        request.get("http://www.reddit.com/r/nottheonion.json?limit=100&raw_json=1", {}, function(err, res, body){
            if(err) throw err;
            
            let result = JSON.parse(body);
            let index = Math.floor((Math.random() * 50) + 1);
            let imageURL;

            if (result.data.children[index].data.preview)
                imageURL = result.data.children[index].data.preview.images[0].source.url
            else
                imageURL = ""

            message.channel.send({embed: {
                color: 0x13c37a, // turquoise
                title: "Breaking News!",
                image: {
                    url: imageURL
                },
                description: "[" + result.data.children[index].data.title + "]" + '(http://www.reddit.com' + result.data.children[index].data.permalink + ")",
                footer: {
                    icon_url: message.guild.me.user.avatarURL,
                    text: message.guild.me.nickname
                }
            }});
        }).auth(appID, secret, true);

        //message.channel.send("Impatient twat.");
    }
}

module.exports = News;