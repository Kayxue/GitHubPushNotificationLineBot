# SE7BackendNotificationBot
軟體工程第七組後端專案 Push Notification Line Bot

## Installation

```bash
$ deno install
```

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
4. 安裝此專案所需模組：
```
deno install --allow-script
```
5. 在專案根目錄下輸入以下指令即可執行
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
5. 複製完成後，請前往專案 `SE7Backend`-> `Settings` -> `Webhooks`，並點選`Add Webhooks`
6. 在增加 Webhook 頁面中，請做以下設定：
    * `Payload URL` 請貼上剛剛你複製的網址，並且在最後加上 `/github`
    * `Content type` 請選擇 `application/json`
    * `SSL verification` 請選擇 `Disable`
    * `Which events would you like to trigger this webhook?` 請選擇 `Just the push event.`
7. 最後點選 `Add Webhook` 即完成 
## 使用框架
<h3 align="center">Nest.js</h3>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
