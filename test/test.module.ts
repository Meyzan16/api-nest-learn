import { Global, Module } from "@nestjs/common";
import { TestService } from "./test.service";


@Global()
@Module({
    providers : [TestService],
})
export class TestModule {
  
}