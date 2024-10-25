import { Body, Controller, Post, Headers } from "@nestjs/common";
import { GithubService } from "./github.service.ts";

@Controller("github")
export class GithubController {
	public constructor(private readonly githubServce: GithubService) {}

	@Post()
	public async sendGithubWebhook(
		@Body() body: any,
		@Headers("x-github-event") event: string,
	) {
		if (event != "push") return "Receieved";
		return this.githubServce.sendGithubWebhook(body);
	}
}
