import { Injectable, Inject } from "@nestjs/common";
import * as line from "@line/bot-sdk";
import moment from "moment-timezone";

@Injectable()
export class GithubService {
	public constructor(
		@Inject("LineClient")
		private readonly client: line.messagingApi.MessagingApiClient,
	) {}

	public async sendGithubWebhook(body: any) {
		const commits = body.commits;
		for (const commit of commits) {
			await this.client.broadcast({
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
												text: `${commit.author.name} pushed his/her change to the repo`,
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
														text: commit.id.slice(0,7),
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
															.format("YYYY/MM/DD HH:mm:ss"),
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
			}).catch(_ => null);
		}
		return "Finished";
	}
}
