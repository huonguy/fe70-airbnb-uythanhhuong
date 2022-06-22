import { Injectable } from '@angular/core';
import superagent from 'superagent';

@Injectable({ providedIn: 'root' })
export class GoogleMapService {
  constructor() { }

  map: google.maps.Map;

  getGeoCode(address) {
    return new Promise((resolve: any, reject: any) => {
      superagent
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCwPPdSSe3aduv7vLFk_q4i8EtTz_dbJfc&address=${address}`
        )
        .end((err: any, res: any) => {

          if (err) {
            reject(err);
          }

          const { lat, lng } = res.body.results[0].geometry.location
          const data = { lat, lng };
          resolve(data);
        });
    });
  }

}
