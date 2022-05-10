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
        var listName = "";
        switch(args) {
            case "-to do": {
                listId = "62756dc0c020fb8cc16c1d10";
                listName = "To Do";
                let cards = await this.getCardsRequest(listId);
                this.printCards(cards, listName, message);
            } break;
            case "-doing": {
                listId = "62756dc470c10242a86af89a";
                listName = "Doing";
                let cards = await this.getCardsRequest(listId);
                this.printCards(cards, listName, message);
            } break
            case "-done": {
                listId = "62756dc7f84a3732683c8290";
                listName = "Done";
                let cards = await this.getCardsRequest(listId);
                this.printCards(cards, listName, message);
            } break;
            case "-deployed": {
                listId = "62756dca519e8076d04c3105";
                listName = "Deployed";
                cards = await this.getCardsRequest(listId);
                this.printCards(cards, listName, message);
            } break;
            case "-suggestions": {
                listId = "627859bfb5b5161121f4250b";
                listName = "Suggestions";
                console.log("hello");
                let cards = await this.getCardsRequest(listId);
                this.printCards(cards, listName, message);
            } break;
            case "":
                let response = await GetLists.prototype.getListsRequest();
                var listNames = [];
                for(let i = 0; i < response.length; i++) {
                    listNames.push(response[i].name);
                }
                var listsList = listNames.join("\n");
                message.channel.send(`Please specify a list with the "-<list-name>"\ command. The following lists are available: \n${cardsList}`);
                break;
        }
    }


    async getCardsRequest(listId) {
        return new Promise ((resolve, reject) => {
            const options = {
                hostname: baseUrl,
                method: 'GET',
                path: `/1/lists/${listId}/cards/${authParams}`
            }

            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
            
                let data = '';
            
                res.on('data', (chunk) => {
                    data += chunk;
                });
            
                res.on('close', () => {
                    console.log('Retrieved all data');
                    resolve (JSON.parse(data));
                });
            });

            req.on('error', error => {
                reject(error);
                console.error(error);
            }),

            req.end();
        });
    }

    printCards(cards, listName, message) {
        var cardNames = [];
        for(let i = 0; i < cards.length; i++) {
            cardNames.push(cards[i].name);
        }
        var cardsList = cardNames.join("\n");
        message.channel.send(`Jobs on the ${listName} list: \n${cardsList}`);
    }
} 

module.exports = GetCards;
