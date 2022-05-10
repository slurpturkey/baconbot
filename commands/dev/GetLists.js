const commando = require('discord.js-commando');
const fs = require('fs');
const https = require('https');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.trello_key;
const token = auth.trello_token;
const baseUrl = "api.trello.com";
const boardId = "62756d312de50469a3faaf36";
const authParams = "?key=" + key + "&token=" + token;

class GetLists extends commando.Command {
    constructor(client){
        super(client, {
            name: 'getlists',
            group: 'dev',
            memberName: 'getlists',
            description: 'Gets lists from Trello'
        });
    }

    run(message, args){
        if(args == "-id") {
            //todo: add param to also return ids alongside names
        }
        getListsRequest(message, args);
    }

    getListsRequest(message, args) {
        console.log("test");
        const post_request_args = "?key=" + key + "&token=" + token;
        const options = {
            hostname: baseUrl,
            method: 'GET',
            path: `/1/boards/${boardId}/lists/${post_request_args}`,
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        
            let data = '';
        
            res.on('data', (chunk) => {
                data += chunk;
            });
        
            res.on('close', () => {
                console.log('Retrieved all data');
                this.response = JSON.parse(data);
                return this.response;

/*                 var cardNames = [];
                for(let i = 0; i < response.length; i++) {
                    cardNames.push(response[i].name);
                }

                message.channel.send({embed: {
                    color: 0x850000, // red
                    description: cardNames.join(" \n")
                }}); */
            });
        });

        req.on('error', error => {
            console.error(error);
        }),

        req.end();
    }
}

module.exports = GetLists;

