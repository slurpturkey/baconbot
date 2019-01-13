const commando = require('discord.js-commando');
var unirest = require('unirest');

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


        await unirest.get("https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + args)
        .header("X-Mashape-Key", "scRcagJx1emshHV6QODp4QXJonYBp1uGz8cjsnCSGGhbNUhsWc")
        .header("Accept", "text/plain")
        .end(function (result) {
            if(result.body){
                //if(result.body.result_type == "exact"){
                for(let i = 0; i < 9; i++){
                    if(result.body.list[i]){
                        if(result.body.list[i].definition.length < 2000){
                            let def = result.body.list[i].definition;
                            def = def.replace(/\[/g, '');
                            def = def.replace(/\]/g, '');
                            if(result.body.list[i].example){
                                let eg = result.body.list[i].example;
                                eg = eg.replace(/\[/g, '');
                                eg = eg.replace(/\]/g, '');
                                message.channel.send({embed: {
                                    color: 0xfbf72d,
                                    title: result.body.list[i].word,
                                    url: encodeURI("https://www.urbandictionary.com/define.php?term=" + result.body.list[0].word),
                                    description: def,
                                    fields: [{
                                        name: "Example",
                                        value: eg
                                    }]
                                }});
                                break;
                            }
                            else{
                                message.channel.send({embed: {
                                    color: 0xfbf72d,
                                    title: result.body.list[i].word,
                                    url: encodeURI("https://www.urbandictionary.com/define.php?term=" + result.body.list[0].word),
                                    description: def
                                }});
                                break;
                            }
                        }
                        else{
                            continue;
                        }

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
            else{
                message.channel.send({embed: {
                    color: 0xfbf72d,
                    title: "Syntax error",
                    description: "Please try a different word."
                }})
            }

        })
    }
}

module.exports = DefineCommand;