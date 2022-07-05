const https = require('https');

import { Coordinate } from "src/weather/interface/weather.interface"

export const getCurrentWeather = (coordinate: Coordinate): object => {
  return new Promise((resolve, reject) => {
      https.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`, 
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk
          })

          res.on('end', () => {
            try {
              return resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          })
        }
      )
  });
}


export const get5Days3HoursWeather = (coordinate: Coordinate): object => {
  return new Promise((resolve, reject) => {
      https.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`, 
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk
          })

          res.on('end', () => {
            try {
              return resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          })
        }
      )
  });
}