import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  [x: string]: any;

  constructor(private carService:CarService,private brandService:BrandService,private colorService:ColorService,private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private cartService:CartService){}

  cars:Car[] = []
  brands:Brand[] = []
  colors:Color[] = []
  imagePath:string
  baseUrl="https://localhost:44366"
  dataLoaded = false
  filterText:string = "" ;
  brandFilter: number = 0;
  colorFilter: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else {
        this.getCars();
        this.getBrands();
        this.getColors();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsByBrand(id:number){
    this.carService.getCarsByBrand(id).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsByColor(id:number){
    this.carService.getCarsByColor(id).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  addToCart(car:Car){
    if (car.id === 1) {
      this.toastrService.error("This car cannot be added to cart")
    } else { 
      this.cartService.addToCart(car);
      this.toastrService.success(car.description, "Successfully added") 
      
    }
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    this.carService.getCarsByColorAndBrand(brandId,colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

}
