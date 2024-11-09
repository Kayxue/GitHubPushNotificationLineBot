import { Hono } from "jsr:@hono/hono";
import { cors } from "jsr:@hono/hono/cors";
import { githubRouter } from "./Router/github.ts";

const app = new Hono();

app.get("/", (c) => {
    return c.text("Welcome to the Bot API");
});

app.route("github", githubRouter);

app.use(cors());
Deno.serve({ port: 3000 }, app.fetch);
