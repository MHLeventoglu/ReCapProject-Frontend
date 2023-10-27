import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/baseResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  
  apiUrl = 'https://localhost:44366/api/rentals/';
  
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<BaseResponseModel<Rental>> {
    let newUrl = this.apiUrl + 'getrentaldetails'
    return this.httpClient.get<BaseResponseModel<Rental>>(newUrl);
  }

  addRental(rental:Rental):Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'add'
    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }

  checkRentingConditions(rental:Rental):Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'rentingconditions'
    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }
}
