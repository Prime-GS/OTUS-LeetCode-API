import { Global, Module } from '@nestjs/common'
import { TestResolver } from './test.resolver'

@Global()
@Module({
  providers: [TestResolver],
})
export class CommonModule {}
