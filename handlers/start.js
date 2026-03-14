const {loadDB} = require("../utils/database");

module.exports = (bot)=>{

bot.onText(/\/start/,(msg)=>{

const db = loadDB();

const buttons = db.products.map(p=>[{
text:`${p.name} - Rp${p.price}`,
callback_data:`buy_${p.id}`
}]);

bot.sendMessage(msg.chat.id,"📦 Daftar Produk",{
reply_markup:{inline_keyboard:buttons}
});

});

};