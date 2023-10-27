import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44366/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<BaseResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<BaseResponseModel<Car>>(newUrl)
  }
  getCarsByBrand(id:number):Observable<BaseResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getbybrandid?id=" + id
    return this.httpClient.get<BaseResponseModel<Car>>(newUrl)
  }
  getCarsByColor(id:number):Observable<BaseResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getbycolorid?id=" + id
    return this.httpClient.get<BaseResponseModel<Car>>(newUrl)
  }
  getCarById(id:number):Observable<BaseResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getbyid?id=" +id
    return this.httpClient.get<BaseResponseModel<Car>>(newUrl)
  }
  getCarsByColorAndBrand(brandId:number,colorId:number):Observable<BaseResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getbycolorandbrand?brandId=" + brandId + "&colorId=" + colorId
    return this.httpClient.get<BaseResponseModel<Car>>(newUrl)
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
}
