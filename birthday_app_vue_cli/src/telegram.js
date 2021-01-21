import {Telegraf} from 'telegraf';

const bot = new Telegraf('1572234713:AAHn9BUbVyU78Svog9aO5A9L7u4seB1jCFs');


function initialeTelegramBot (test) {
    bot.start((ctx) => {
        ctx.reply("Hello! Type 'next birthday' to get the next birthday")
    })

    bot.hears('next birthday', (ctx) => {
        ctx.reply(`${test}`);
    })
    
    bot.launch()
    console.log('test')
}



export {
    initialeTelegramBot
}