const commando = require('discord.js-commando');
const request = require('request');

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
        
        request.get("http://www.reddit.com/r/nottheonion.json?limit=100", {}, function(err, res, body){
            if(err) throw err;
            
            let result = JSON.parse(body);
            let index = Math.floor((Math.random() * 50) + 1);

            message.channel.send({embed: {
                color: 0x13c37a, // turquoise
                title: "Breaking News!",
                description: "[" + result.data.children[index].data.title + "]" + '(http://www.reddit.com' + result.data.children[index].data.permalink + ")",
                footer: {
                    icon_url: message.guild.me.user.avatarURL,
                    text: message.guild.me.nickname
                }
            }});
        });

        //message.channel.send("Impatient twat.");
    }
}

module.exports = News;