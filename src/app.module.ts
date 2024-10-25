import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.ts";
import { AppService } from "./app.service.ts";
import { GithubModule } from './github/github.module.ts';

@Module({
	imports: [GithubModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
