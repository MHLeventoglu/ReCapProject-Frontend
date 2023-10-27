import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent {
  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService){}

  ngOnInit():void{
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      description:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required]
    })
  }
  add(){
    if (this.carAddForm.valid) {
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(data=>{
        console.log(data);
        this.toastrService.success(data.message,"Successful");
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("You cannot submit before fullfill the form !","Dikkat"); 
    }
    
  }



}
