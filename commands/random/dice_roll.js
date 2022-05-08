const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a die'
        });
    }

    async run(message, args){
        if (args == 0) args = 6;
        var roll = Math.floor(Math.random() * args) + 1;
        message.reply("You rolled a test " + roll);
    }
}

module.exports = DiceRollCommand;
