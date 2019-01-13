const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Markov = require('markov-strings');
const _ = require('lodash');
var fs = require('fs');
const msg = require('../bot/msg');

let filePath = "./msg.txt";
let sourceText = fs.readFileSync(filePath, 'utf-8');

let msgs = sourceText.split('\n');

if(msgs[0] == '' || msgs[0] == '\n')
    msgs.shift();

class MarkovChain extends commando.Command {
    constructor(client){
        super(client, {
            name: 'markov',
            group: 'dictionary',
            memberName: 'markov',
            description: 'Generates an interesting message using a markov chain'
        });
    }

    async run(message, args){
        //const options = {stateSize: 2, minScore: 50, maxWords: 15, minWords: 10};
        const options = {stateSize: 2, minScore: 50, maxWords: 15, minWords: 10, maxTries: 100000, filter: res => { return (res.score >= 100) && (_.size(res.refs) >= 10); }}
        const markov = await new Markov(msgs, options);
        
        markov.buildCorpusSync();
        const result = markov.generateSentenceSync();
        console.log(result);

        message.channel.send({embed: {
            color: 0x850000, // red
            //title: title.body[0],
            description: result.string
        }});
    }
}

// async function getSource(message){
//     let mes = new Discord.Collection();
//     let messageArray = new Array();
//     let data = [];
//     let index = ""
//     let iter = 150
//     index.concat(message.id);

//     do{
//         mes = await message.channel.fetchMessages({limit: 100, before: index});
//         messageArray = [];
//         messageArray = await mes.array();
//         for(let i = 0; i < messageArray.length; i++){
//             if(!messageArray[i].author.bot){
//                 data.push(messageArray[i].content);
//                 //console.log(messageArray[i].content);
//             }
//         }
//         index = "";
//         if(messageArray.length == 100){
//             index = await index.concat(messageArray[messageArray.length - 1].id);
//         } else break;
        
//         console.log(index);
//         iter -=1
//     }while(iter > 0);

//     // for(var i = data.length - 1; i >= 0; i--){
//     //     await msg.loadMessageString(data[i])
//     //     console.log("message " + i);
//     // }

//     console.log("done");

//     return data; // return array of strings
// }

module.exports = MarkovChain;