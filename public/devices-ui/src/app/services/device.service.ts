import { Injectable } from '@angular/core';
import { DeviceModel } from '../models/device.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }


  getDevices(params: any): Observable<any> {

    let finalUrl = 'http://localhost:3001/' + 'devices?'
    + 'location=' + params.location
    + '&parent_location=' + params.parentLocation
    + '&connected=' + params.connected;

    return this.http.get(finalUrl);
  }

  getDevicesByLocation(location: number): Observable<any> {

    let finalUrl = `http://localhost:3001/devices/location/${location}`;
    return this.http.get(finalUrl);
  }

}
