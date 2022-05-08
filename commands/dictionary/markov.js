const commando = require('discord.js-commando');
const Discord = require('discord.js');
const Markov = require('markov-strings').default;
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

        const options = {minScore: 100, maxWords: 15, minWords: 10, maxTries: 100000, filter: res => { return (res.score >= 100) && (_.size(res.refs) >= 10);}}; // Properties of markov chain
        
        const markov = await new Markov(msgs, {stateSize: 1});

        markov.buildCorpus();
        const result = markov.generate(options);
        console.log(result);

        message.channel.send({embed: {
            color: 0x850000, // red
            description: result.string
        }});
    }
}

module.exports = MarkovChain;