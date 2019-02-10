const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Markov = require('markov-strings');
const _ = require('lodash');
const fs = require('fs');
const msg = require('../bot/msg');

let filePath = "./msg.txt";
let sourceText = fs.readFileSync(filePath, 'utf8');

let msgs = sourceText.split('\n');

if(msgs[0] == '' || msgs[0] == '\n') msgs.shift();

class MarkovChain extends commando.Command {
    constructor(client){
        super(client, {
            name: 'markov',
            group: 'dictionary',
            memberName: 'markov',
            description: 'Generated an interesting message using a markov chain'
        });
    }

    async run(message, args){

        const options = {stateSize: 2, minScore: 50, maxWords: 15, minWords: 10, maxTries: 100000, filter: res => { return (res.score >= 100) && (_.size(res.refs) >= 10);}};
        const markov = await new Markov(msgs, options);

        markov.buildCorpusSync();
        const result = markov.generateSentenceSync();
        console.log(result);

        message.channel.send({embed: {
            color: 0x850000, // red
            description: result.string
        }});

        //message.channel.send("I'm fucking working on it!!");
    }
}

module.exports = MarkovChain;