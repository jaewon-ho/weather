const https = require('https');

import { Injectable } from '@nestjs/common';
import { Coordinate } from './interface/weather.interface';

import { getCurrentWeather, get5Days3HoursWeather } from 'src/utils/openWeatherAPI';

@Injectable()
export class AppService {

  async getCurrentWeather(coordinate: Coordinate): Promise<object>{
    return await getCurrentWeather(coordinate);
  }

  async get5Days3HoursWeather(coordinate: Coordinate): Promise<object>{
    return await get5Days3HoursWeather(coordinate);
  }
}
