const timers = {};

function startTimer(userId,callback,time){
timers[userId] = setTimeout(callback,time);
}

function stopTimer(userId){
if(timers[userId]){
clearTimeout(timers[userId]);
delete timers[userId];
}
}

module.exports = {startTimer,stopTimer};