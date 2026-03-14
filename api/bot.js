const TelegramBot = require("node-telegram-bot-api");
const config = require("../config/config");

const startHandler = require("../handlers/start");
const buyHandler = require("../handlers/buy");
const paymentHandler = require("../handlers/payment");

const bot = new TelegramBot(config.BOT_TOKEN);

startHandler(bot);
buyHandler(bot);
paymentHandler(bot);

module.exports = async (req,res)=>{

if(req.method==="POST"){
bot.processUpdate(req.body);
res.status(200).end();
}else{
res.status(200).send("Bot Running");
}

};
