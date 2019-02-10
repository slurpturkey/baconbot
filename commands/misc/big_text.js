const commando = require('discord.js-commando');

class BigTextCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'big',
            group: 'misc',
            memberName: 'big',
            description: 'Converts your message into emoji letters.'
        });
    }

    async run(message, args){
        message.channel.send(parse(args.toLowerCase()));
    }
}

function parse(str){

    var output = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'a' || str[i] == 'A' || str[i] == 'b' || str[i] == 'B' || str[i] == 'c' || str[i] == 'd' || str[i] == 'C' || str[i] == 'e' || str[i] == 'D' || str[i] == 'f' || str[i] == 'E' || 
            str[i] == 'g' || str[i] == 'F' || str[i] == 'h' || str[i] == 'G' || str[i] == 'i' || str[i] == 'H' || str[i] == 'j' || str[i] == 'I' || str[i] == 'k' || str[i] == 'l' || str[i] == 'J' || 
            str[i] == 'm' || str[i] == 'K' || str[i] == 'n' || str[i] == 'L' || str[i] == 'o' || str[i] == 'p' || str[i] == 'q' || str[i] == 'r' || str[i] == 's' || str[i] == 't' || str[i] == 'u' || 
            str[i] == 'v' || str[i] == 'w' || str[i] == 'x' || str[i] == 'y' || str[i] == 'z' || str[i] == 'M' || str[i] == 'N' || str[i] == 'O' || str[i] == 'P' || str[i] == 'Q' || str[i] == 'R' || 
            str[i] == 'S' || str[i] == 'T' || str[i] == 'U' || str[i] == 'V' || str[i] == 'W' || str[i] == 'X' || str[i] == 'Y' || str[i] == 'Z') {

            output = output.concat(":regional_indicator_", str[i], ": ");
        }
        else {
            switch (str[i]) {
            case '0':
                output = output.concat(":zero: ");
                break;
            case '1':
                output = output.concat(":one: ");
                break;
            case '2':
                output = output.concat(":two: ");
                break;
            case '3':
                output = output.concat(":three: ");
                break;
            case '4':
                output = output.concat(":four: ");
                break;
            case '5':
                output = output.concat(":five: ");
                break;
            case '6':
                output = output.concat(":six: ");
                break;
            case '7':
                output = output.concat(":seven: ");
                break;
            case '8': 
                output = output.concat(":eight: ");
                break;
            case '9':
                output = output.concat(":nine: ");
                break;
            case ' ':
                output = output.concat(":black_large_square: ");
                break;
            case '!!':
                output = output.concat(":bangbang:");
                break;
            case '!?' || '?!': 
                output = output.concat(":interrobang:");
                break;
            case '!':
                output = output.concat(":exclamation: ");
                break;
            case '?':
                output = output.concat(":question:");
                break;
            // case '\'':
            //     output = output.concat(":round_pushpin:");
            //     break;
            default:
                output = output.concat(str[i]);
            }
        }

    }
    return output;
}

module.exports = BigTextCommand;