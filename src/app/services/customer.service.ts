import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { BaseResponseModel } from '../models/baseResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  apiUrl = 'https://localhost:44366/api/customers/getall';
  
  constructor(private httpClient: HttpClient) {}
  
  getCustomers(): Observable<BaseResponseModel<Customer>> {
    return this.httpClient.get<BaseResponseModel<Customer>>(this.apiUrl);
  }
}
