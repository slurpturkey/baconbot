const commando = require('discord.js-commando');
const fs = require('fs');

// auth file (saves from hard-coding keys)
const filePath = "discordauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// create bot user
const bot = new commando.Client({owner: auth.owner_id, unknownCommandResponse: false, nonCommandEditable: false});

// register commands
bot.registry.registerGroup('dictionary', 'Dictionary');
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('error', function(){
    console.error();
});

bot.login(auth.bot_id);
const guildID = auth.guild_id;