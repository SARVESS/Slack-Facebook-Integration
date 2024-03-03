import { Module } from '@nestjs/common';
import { FacebookModule } from './facebook/facebook.module';

@Module({
  imports: [FacebookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
