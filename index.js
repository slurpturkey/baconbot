#!/usr/bin/env node 
const commando = require('discord.js-commando');
const fs = require('fs');
const passiveCommands = require('./commands/bot/passiveCommands');
const msg = require('./commands/bot/msg');

// auth file (saves from hard-coding keys)
const filePath = "discordauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// create bot user
const bot = new commando.Client({owner: auth.owner_id, unknownCommandResponse: false, nonCommandEditable: false});
bot.login(auth.bot_id);
const guildID = auth.guild_id;

// register commands
bot.registry.registerGroup('dictionary', 'Dictionary');
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('misc', 'Misc');
bot.registry.registerGroup('dev', 'Dev');
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('error', function(){
    console.error();
});

bot.on('message', function(message){
    if(message.channel.id != "694914362095304771") // blacklist code channel from collecting source data for !markov command
        msg.appendMessage(message);
});

// get latest channel pin by going through all the channels, grabbing the last pin of each channel, selecting the one with the latest date, getting the channel from that.
let currentChannelID;
bot.on('ready', function(){
    guild = bot.guilds.get(guildID);
    currentChannelID = passiveCommands.currentChannelID(guild);
});

bot.on('channelPinsUpdate', async function(channel, time){
    currentChannelID = channel.id;
    await passiveCommands.loadPins(channel);
});