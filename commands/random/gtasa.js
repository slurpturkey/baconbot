const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

class GTASA extends commando.Command {
    constructor(client){
        super(client, {
            name: 'gtasa',
            group: 'random',
            memberName: 'gtasa',
            description: 'Random line from GTA: San Andreas'
        });
    }

    async run(message, args){
        let lines = new Array();
        lines = fs.readFile("gtasa.txt", function(error,data){
            if(error) throw error;
            let script = data.toString();
            script = script.replace(/\r\n/g, "%");
            for(let i = 0; i < 25; i++){
                script = script.replace(/  /g, "");
            }
            lines = script.split(/%%/g)
            for(let k in lines){
                if(lines[k] == '') lines[k] = "\n";
                lines[k] = lines[k].replace(/%/, "\n");
                lines[k] = lines[k].replace(/%/g, "");
            }
            let text = lines[Math.floor(Math.random() * lines.length)];
            //lines = lines.join();
            // lines = lines.filter(function(value, index, arr){
            //     return value != "";
            // });
            //console.log(lines[1]);
            //console.log(text);
            message.channel.send({embed: {
                color: 0xe6a728, // Sand colour
                description: text, // The content of the pinned message
            }})
        });
    }
}

module.exports = GTASA;