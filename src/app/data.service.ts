import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  senddata(file: any) {
    return this.http.post('http://c01b284e.ngrok.io/file/upload/', file );
  }
}
