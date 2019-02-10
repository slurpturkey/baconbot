const commando = require('discord.js-commando');

class Woke extends commando.Command {
    constructor(client){
        super(client, {
            name: 'woke',
            group: 'random',
            memberName: 'woke',
            description: 'Wokeifies the previous message'
        });
    }

    async run(message, args){
        
        let mColl = await message.channel.fetchMessages({limit: 2});
        let mArray = await mColl.array();
        let re = / /g;
        let str = "";
        let person;

        if(!mArray[1].author.bot){
            if(mArray[1].content.includes(" ")){
                str = await mArray[1].content.replace(re, " :clap: ");
                str = ":clap: " + str + " :clap:";
            }
            else str = ":clap: " + mArray[1].content + " :clap:";
        }
        else str = ":clap: fuck :clap: you :clap:"; 

        message.channel.send({embed: {
            color: 0xd65d00,
            author: {
                name: mArray[1].member.nickname,
                icon_url: mArray[1].author.avatarURL
            },
            description: str
        }});

        //message.channel.send("Hold on a fucking day or two, goddamn.");
        
    }
}

module.exports = Woke;