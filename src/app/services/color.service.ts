import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { BaseResponseModel } from '../models/baseResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  apiUrl = "https://localhost:44366/api/colors/getall";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<BaseResponseModel<Color>>{
    return this.httpClient.get<BaseResponseModel<Color>>(this.apiUrl)
  }
}
