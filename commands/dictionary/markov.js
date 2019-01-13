const commando = require('discord.js-commando');

class Markov extends commando.Command {
    constructor(client){
        super(client, {
            name: 'markov',
            group: 'random',
            memberName: 'markov',
            description: 'Rolls a die'
        });
    }

    async run(message, args){
        message.channel.send("I'm fucking working on it!!");
        
        
    }
}

module.exports = Markov;