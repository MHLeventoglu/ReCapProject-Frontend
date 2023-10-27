import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car[];
  baseUrl = 'https://localhost:44366';
  dataLoaded: boolean;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe(response=>{
      this.car = response.data;
      this.dataLoaded = true;
    })
    // getBrands() {

    // }
  }
}
