const {loadDB,saveDB} = require("../utils/database");
const {startTimer} = require("../utils/timer");
const config = require("../config/config");

module.exports = (bot)=>{

bot.on("callback_query",(q)=>{

if(!q.data.startsWith("buy_")) return;

const userId = q.from.id;
const db = loadDB();

const productId = q.data.split("_")[1];
const product = db.products.find(p=>p.id===productId);

db.orders[userId] = {
product:product.id,
status:"waiting",
time:Date.now()
};

saveDB(db);

bot.sendMessage(userId,
`💳 Pembayaran

Produk: ${product.name}
Harga: Rp${product.price}

Silakan scan QR lalu kirim foto bukti pembayaran.
Waktu pembayaran 10 menit.`
);

startTimer(userId,()=>{

const db2 = loadDB();

if(db2.orders[userId] && db2.orders[userId].status==="waiting"){

delete db2.orders[userId];
saveDB(db2);

bot.sendMessage(userId,"❌ Waktu habis, pesanan dibatalkan.");

}

},config.PAYMENT_TIME);

});

};
