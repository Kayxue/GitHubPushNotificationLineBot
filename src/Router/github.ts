import { Hono } from "jsr:@hono/hono";
import * as line from "npm:@line/bot-sdk";
import { accessToken } from "../Config.ts";
import moment from "npm:moment-timezone";

const githubRouter = new Hono();
const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: accessToken,
});

githubRouter.post("/", async (c) => {
    const event = c.req.header("x-github-event");
    if (event != "push") return c.text("Receieved");
    const { commits } = await c.req.json();
    for (const commit of commits) {
        await client.broadcast({
            messages: [
                {
                    type: "flex",
                    altText: `${commit.author.name} pushed his/her changes`,
                    contents: {
                        type: "bubble",
                        body: {
                            type: "box",
                            layout: "vertical",
                            contents: [
                                {
                                    type: "text",
                                    text: "Commit Pushed",
                                    weight: "bold",
                                    size: "xl",
                                    wrap: true,
                                },
                                {
                                    type: "box",
                                    layout: "vertical",
                                    margin: "lg",
                                    spacing: "sm",
                                    contents: [
                                        {
                                            type: "text",
                                            text:
                                                `${commit.author.name} pushed his/her change to the repo`,
                                            wrap: true,
                                        },
                                        {
                                            type: "box",
                                            layout: "baseline",
                                            spacing: "sm",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "ID",
                                                    color: "#aaaaaa",
                                                    size: "sm",
                                                    flex: 2,
                                                },
                                                {
                                                    type: "text",
                                                    text: commit.id.slice(0, 7),
                                                    wrap: false,
                                                    color: "#666666",
                                                    size: "sm",
                                                    flex: 6,
                                                },
                                            ],
                                        },
                                        {
                                            type: "box",
                                            layout: "baseline",
                                            spacing: "sm",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "Committer",
                                                    color: "#aaaaaa",
                                                    size: "sm",
                                                    flex: 0,
                                                    wrap: true,
                                                },
                                                {
                                                    type: "text",
                                                    color: "#666666",
                                                    size: "sm",
                                                    flex: 5,
                                                    text: commit.author.name,
                                                },
                                            ],
                                        },
                                        {
                                            type: "box",
                                            layout: "baseline",
                                            spacing: "sm",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "Message",
                                                    color: "#aaaaaa",
                                                    size: "sm",
                                                    flex: 1,
                                                    wrap: true,
                                                },
                                                {
                                                    type: "text",
                                                    wrap: false,
                                                    color: "#666666",
                                                    size: "sm",
                                                    flex: 3,
                                                    text: commit.message,
                                                },
                                            ],
                                        },
                                        {
                                            type: "box",
                                            layout: "baseline",
                                            spacing: "sm",
                                            contents: [
                                                {
                                                    type: "text",
                                                    text: "Time",
                                                    color: "#aaaaaa",
                                                    size: "sm",
                                                    flex: 1,
                                                    wrap: true,
                                                },
                                                {
                                                    type: "text",
                                                    wrap: true,
                                                    color: "#666666",
                                                    size: "sm",
                                                    flex: 3,
                                                    text: moment
                                                        .utc(commit.timestamp)
                                                        .tz("Asia/Taipei")
                                                        .format(
                                                            "YYYY/MM/DD HH:mm:ss",
                                                        ),
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        footer: {
                            type: "box",
                            layout: "vertical",
                            spacing: "sm",
                            contents: [
                                {
                                    type: "button",
                                    style: "link",
                                    height: "sm",
                                    action: {
                                        type: "uri",
                                        label: "Check the commit",
                                        uri: commit.url,
                                    },
                                },
                            ],
                            flex: 0,
                        },
                    },
                },
            ],
        }).catch((_) => null);
    }
    return c.text("Finished sending message!");
});

export { githubRouter };
