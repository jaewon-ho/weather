const https = require('https');
const moment = require('moment');
const _ = require('lodash');

import { Injectable } from '@nestjs/common';
import { Coordinate } from './interface/weather.interface';

import { getCurrentWeather, get5Days3HoursWeather } from 'src/utils/openWeatherAPI';
import { selectByType, insert, update } from 'src/utils/dynamo';

const CURRENT = "current";
const _5Days3Hours = "5Day3Hours";


@Injectable()
export class AppService {

  async getCurrentWeather(coordinate: Coordinate): Promise<object>{
    let dbData = null; 
    try {
      dbData = await selectByType(CURRENT);
      
      if(_.isEmpty(dbData)) {
        const apiData = await getCurrentWeather(coordinate);
  
        await insert(CURRENT, apiData);
        
        return apiData;
      }

      if(moment().diff(moment(dbData.BASE_DATE.S), 'minutes') > 1) {
        const apiData = await getCurrentWeather(coordinate);
        await update(CURRENT, apiData);

        return apiData;
      }


      return JSON.parse(dbData.DATA.S);
    } catch (e) {
      console.log(e);
    }
  }

  async get5Days3HoursWeather(coordinate: Coordinate): Promise<object>{
    let dbData = null; 
    try {
      dbData = await selectByType(_5Days3Hours);
      
      if(_.isEmpty(dbData)) {
        const apiData = await get5Days3HoursWeather(coordinate);
        await insert(_5Days3Hours, apiData);
        return apiData;
      }

      if(moment().diff(moment(dbData.BASE_DATE.S), 'minutes') > 1) {
        const apiData = await get5Days3HoursWeather(coordinate);
        await update(_5Days3Hours, apiData);
        return apiData;
      }

      return JSON.parse(dbData.DATA.S);
    } catch (e) {
      console.log(e);
    }
  }
}
