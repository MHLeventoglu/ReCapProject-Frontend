import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { BaseResponseModel } from '../models/baseResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  apiUrl = "https://localhost:44366/api/brands/getall";

  constructor(private httpClient: HttpClient) {}

  getBrands():Observable<BaseResponseModel<Brand>>{
    return this.httpClient.get<BaseResponseModel<Brand>>(this.apiUrl)
  }
}
