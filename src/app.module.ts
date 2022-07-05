import { Module } from '@nestjs/common';
import { AppController } from './weather/weather.controller';
import { AppService } from './weather/weather.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
