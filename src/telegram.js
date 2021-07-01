import {Telegraf} from 'telegraf';

const bot = new Telegraf('1572234713:AAHn9BUbVyU78Svog9aO5A9L7u4seB1jCFs');

function isToday(dateParameter) {
    var today = new Date();
    return dateParameter.getDate() === today.getDate() && dateParameter.getMonth() === today.getMonth() && dateParameter.getFullYear() === today.getFullYear();
}


function initializeTelegramBot (nameOfNextFriend, dateOfNextFriend, array, allFriends) {
    bot.start((ctx) => {
        ctx.reply("Hello! Type 'next birthday' to get the next birthday")
    })

    bot.hears('next birthday', (ctx) => {
        ctx.reply(`${nameOfNextFriend}, ${dateOfNextFriend}`);
    })
    bot.hears('all birthdays', (ctx) => {
        ctx.reply(`'${array}'`);
    })
    //this snippet is here to work around the fact that if the next
    //birthday is in the current day, the parsed date value
    //is not available due to the way the sorting works in the buildObject function in utils
    //therefore, I reassign the dateOfNextFriend to be the current day (which it is!)
    if(dateOfNextFriend === (null || undefined || '')) {
        dateOfNextFriend = new Date();
    } 
    //if the next birthday is today, send a message to the telegram chat
    if(isToday(new Date(dateOfNextFriend))) {
        bot.telegram.sendMessage(190511334, `Faz hoje anos: ${nameOfNextFriend}, PARABÉNS ${nameOfNextFriend}`)
    }

    bot.launch()
    console.log('test')
}



export {
    initializeTelegramBot
}