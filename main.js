const Telegraf = require('telegraf');

const stealthyScholarScrapper = require("./stealthyScholarScrapper_v0.1.js");

const config = require("./config.js");

const isHeadless = true;
const isDevtools = false;
const isNoSandboxMode = true;

stealthyScholarScrapper.initializeModule(isHeadless, isDevtools, isNoSandboxMode, function(){
    const bot = new Telegraf(config.TELEGRAM_SECRET_TOKEN);
    bot.start((ctx) => ctx.reply('Welcome Researcher!'))
    bot.help((ctx) => ctx.reply('/bibtex title'))
    
    const command = "/bibtex";
    bot.command(command, function(ctx){
        const receivedText = ctx.message.text;
        const receivedTitle = receivedText.substring(command.length+1);

        const userID = ctx.message.from.id;

        ctx.reply("Alright. I am working on it.");

        stealthyScholarScrapper.getBibtexOfTopArticleInSearch(receivedTitle, function(err, result){
            if(!err) {
                ctx.reply(result);         
            } else {
                ctx.reply("Oops, error happend. Sorry.")
            }
        });
    })
    bot.on('message', function(ctx){
        ctx.reply('Oops, this is not a command. Get help by typing /help')
    })
    bot.launch()
});
