const commando = require('discord.js-commando');
const fs = require('fs');
const https = require('https');
const GetLists = require('./GetLists');

const filePath = "vendorauth.json";
const auth = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const key = auth.trello_key;
const token = auth.trello_token;
const baseUrl = "api.trello.com";
const boardId = "62756d312de50469a3faaf36";
const authParams = "?key=" + key + "&token=" + token;

class GetCards extends commando.Command {
    constructor(client){
        super(client, {
            name: 'getcards',
            group: 'dev',
            memberName: 'getcards',
            description: 'Gets cards from Trello'
        });
    }

    async run(message, args){
        var listId = "";
        switch(args) {
            case "-to do":
                listId = "62756dc0c020fb8cc16c1d10";
                getCards(listId);
                break;
            case "-doing":
                listId = "62756dc470c10242a86af89a";
                getCards(listId);
                break
            case "-done":
                listId = "62756dc7f84a3732683c8290";
                getCards(listId);
                break;
            case "-deployed":
                listId = "62756dca519e8076d04c3105";
                getCards(listId);
                break;
            case "-suggestions":
                listId = "627859bfb5b5161121f4250b";
                getCards(listId);
                break;
            case "":
                let response = await GetLists.prototype.getListsRequest();
                var cardNames = [];
                for(let i = 0; i < response.length; i++) {
                    cardNames.push(response[i].name);
                }
                var cardsList = cardNames.join(" \n");
                message.channel.send(`Please specify which list you wish to see cards for with "-<list-name>" \n ${cardsList}`);
                break;
        }

        const options = {
            hostname: URL1,
            method: 'GET',
            path: path,
            headers: {
                key: key,
                token: token
            }
        };
        console.log(options);
        /* const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        
            let data = '';
        
            res.on('data', (chunk) => {
                data += chunk;
            });
        
            res.on('close', () => {
                console.log('Retrieved all data');
                var response = JSON.parse(data);

                var cardNames = [];
                for(let i = 0; i < response.length; i++) {
                    cardNames.push(response[i].name);
                }

                message.channel.send({embed: {
                    color: 0x850000, // red
                    description: cardNames.join(" \n")
                }});

                console.log(cardNames);

            });
        });

        req.on('error', error => {
            console.error(error);
        }),

        req.end();*/
    } 
}

module.exports = GetCards;
