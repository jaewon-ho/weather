import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './weather.service';
import { Coordinate } from './interface/weather.interface';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getWeather(@Query() coordinate: Coordinate): Promise<object> {
    const round_coordinate = {
      lat: Math.round(coordinate.lat * 10000) / 10000,
      lon: Math.round(coordinate.lon * 10000) / 10000
    }
    const result = {
      current: await this.appService.getCurrentWeather(round_coordinate),
      fiveDays_threeHour: await this.appService.get5Days3HoursWeather(round_coordinate)
    }
    return result;
  }
}
