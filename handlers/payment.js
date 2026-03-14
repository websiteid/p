const {loadDB,saveDB} = require("../utils/database");
const {stopTimer} = require("../utils/timer");
const config = require("../config/config");

module.exports = (bot)=>{

bot.on("photo",(msg)=>{

const userId = msg.from.id;
const db = loadDB();

if(!db.orders[userId]) return;

stopTimer(userId);

const order = db.orders[userId];
const product = db.products.find(p=>p.id===order.product);

const buyDate = new Date();

const exp = new Date();
exp.setDate(exp.getDate()+30);

bot.sendMessage(userId,
`✅ Pembayaran diterima

Produk: ${product.name}
Link: ${product.link}

User: @${msg.from.username}
Tanggal beli: ${buyDate}
Expired: ${exp}`
);

bot.sendMessage(config.ADMIN_ID,
`📢 Order Baru

User: @${msg.from.username}
Produk: ${product.name}
Harga: Rp${product.price}`
);

delete db.orders[userId];
saveDB(db);

});

};