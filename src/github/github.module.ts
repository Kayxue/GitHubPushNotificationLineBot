import { Module } from "@nestjs/common";
import { GithubService } from "./github.service.ts";
import { GithubController } from "./github.controller.ts";
import * as line from "@line/bot-sdk";
import { accessToken } from "../Config.ts";

@Module({
  controllers: [GithubController],
	providers: [
    GithubService,
    {
      provide:"LineClient",
      useValue:new line.messagingApi.MessagingApiClient({
        channelAccessToken: accessToken,
      })
    }
  ],
})
export class GithubModule {}
