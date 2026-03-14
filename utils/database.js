const fs = require("fs");
const dbPath = "./data/database.json";

function loadDB(){
return JSON.parse(fs.readFileSync(dbPath));
}

function saveDB(data){
fs.writeFileSync(dbPath,JSON.stringify(data,null,2));
}

module.exports = {loadDB,saveDB};
