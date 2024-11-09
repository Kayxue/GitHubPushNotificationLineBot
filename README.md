# GitHubPushNotificationLineBot
Line bot for sending GitHub push webhook to Line
## Running the app
1. 安裝 Deno：
```bash
# Mac OS/Linux
curl -fsSL https://deno.land/install.sh | sh
#Windows
irm https://deno.land/install.ps1 | iex
```
2. Fork 並 Clone 此專案（若您需要自行修改或貢獻，若不用可直接 Clone 即可） 
3. 在此專案下的 src 資料夾內，建立 `Config.ts`，並輸入以下內容（Channel Access Token 請在 Line Developer 頁面自行產生）：
```ts
export const accessToken = "<Your channel access token>"
```
4. 在專案根目錄下輸入以下指令即可執行
```bash
# development
$ deno run start

# watch mode
$ deno run start:dev
```
> [!CAUTION]
> 請注意：此時在本地端執行仍無法接收 GitHub 傳送的 Webhook 資料，若真想測試，請自己利用 `smee.io` 服務將外部傳送的 Webhook 送到本地 server 上。又或者若您是利用 Docker Container 執行，也可利用 Cloudflare Tunnel 等方式讓外部可直接連入。
## Deploy the app to Deno Deploy
1. 使用以下指令安裝 deployctl:
```
deno install -Arf jsr:@deno/deployctl
```
2. 輸入以下指令開始部署至 Deno Deploy
```
deployctl deploy --project <project name>
```
3. 部署中途可能會要求您以 GitHub 帳戶登入，請順便進行登入
4. 確定部署成功後，至專案的 Deno Deploy 首頁複製該網頁的最短連結
5. 複製完成後，請前往你想收到 Push 通知的專案的 `Settings` -> `Webhooks`，並點選`Add Webhooks`
6. 在增加 Webhook 頁面中，請做以下設定：
    * `Payload URL` 請貼上剛剛你複製的網址，並且在最後加上 `/github`
    * `Content type` 請選擇 `application/json`
    * `SSL verification` 請選擇 `Disable`
    * `Which events would you like to trigger this webhook?` 請選擇 `Just the push event.`
7. 最後點選 `Add Webhook` 即完成 
## 使用框架
<p align="center">
  <a href="https://hono.dev">
    <img src="https://raw.githubusercontent.com/honojs/hono/main/docs/images/hono-title.png" width="500" height="auto" alt="Hono"/>
  </a>
</p>

<p align="center">A small, simple, and ultrafast web framework built on Web Standards.</p>
