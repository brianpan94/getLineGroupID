# getLineGroupID

這是用來查看 LINE 群組 ID 的歷史 webhook 原型。機器人收到 `message` 事件時，程式會把**完整事件**印到終端，並嘗試原樣回覆收到的文字。操作者須自行從群組事件的 `source.groupId` 找出 ID；程式不會擷取、儲存或單獨顯示 groupId。

## 運作流程

1. `app.js` 透過 `dotenv` 讀取本目錄的 `.env`，建立 `linebot` 客戶端。
2. 程式在 `3000` port 的 `/linewebhook` 接收 LINE webhook。
3. 收到訊息後印出事件，並以 `event.message.text` 回覆。

沒有資料庫、管理介面或群組登錄功能。

## 設定與執行

需要 Node.js、npm、可用的 LINE Messaging API 頻道，以及能讓 LINE 連到本機 `3000` port 的公開 HTTPS 入口。這個專案沒有提供公開入口或部署設定。

在本目錄安裝套件，並填寫既有的 `.env`：

```dotenv
LINE_CHANNEL_ID=你的頻道 ID
LIEN_CHANNEL_SECRET=你的頻道 secret
LINE_CHANNEL_ACCESS_TOKEN=你的頻道 access token
```

`LIEN_CHANNEL_SECRET` 的 **LIEN** 是原始程式實際讀取的拼法，不能只在設定檔改成 `LINE_CHANNEL_SECRET`。`.env` 已在此專案的版本控制中，請勿將填有真實憑證的檔案提交。

```sh
npm ci
node app.js
```

原專案沒有 `npm start` 指令。將 LINE 頻道的 webhook URL 設為公開入口的 `https://你的網域/linewebhook`，把機器人加入目標群組後，在群組傳送**文字**訊息；再從執行終端印出的事件查看 `source.groupId`。只有群組來源事件才會提供群組 ID。

## 已知限制

- 收到的完整事件可能含訊息內容與識別資訊，終端輸出應妥善保管。
- 程式沒有判斷訊息類型；圖片等非文字訊息的 `event.message.text` 可能不存在，回覆可能失敗。
- 程式沒有檢查必要設定是否齊全，也沒有測試、健康檢查或可重現的部署配置。
- 這是歷史原型；上述步驟依原碼整理，尚未驗證啟動、LINE 連線或目前平台行為。

## 目錄

| 檔案 | 用途 |
| --- | --- |
| [`app.js`](./app.js) | webhook 接收、事件輸出與文字回覆 |
| [`package.json`](./package.json) | npm 依賴宣告；無 scripts |
| [`package-lock.json`](./package-lock.json) | 依賴版本鎖定 |
| `.env` | LINE 連線參數；現有檔案已被 Git 追蹤 |
