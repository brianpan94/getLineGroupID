require('dotenv').config();

// 引用linebot SDK
var linebot = require('linebot');
//先修改機器人資訊
const {LINE_CHANNEL_ID,  LIEN_CHANNEL_SECRET,  LINE_CHANNEL_ACCESS_TOKEN} = process.env;

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: LINE_CHANNEL_ID,
  channelSecret: LIEN_CHANNEL_SECRET,
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  
  console.log(event);
  event.reply(event.message.text).then(function (data) {
    // 當訊息成功回傳後的處理
  }).catch(function (error) {
    // 當訊息回傳失敗後的處理
    console.error(error);
  });
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
    
});