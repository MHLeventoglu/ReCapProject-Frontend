import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  addFormGroup: FormGroup;  
  rentals:Rental[] = []
  currentCarId:number;
  rentDate:Date;
  returnDate:Date;
  
  dataLoaded = false
  constructor(private rentalService:RentalService, private formBuilder:FormBuilder, private toastrService:ToastrService, private router:Router, private activatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
    this.createAddFormGroup();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.currentCarId = Number(params["carId"]);
      }
    })
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  createAddFormGroup() {
    this.addFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

   calculateDiff(){
    console.log("buradan efendm");
    let rentDate = new Date(this.rentDate).getTime();
    let returnDate = new Date(this.returnDate).getTime();
    let range = (returnDate - rentDate)/(1000 * 60 * 60 * 24);
    return range; 
  }

  checkRentingConditions(){
    let rental:Rental = Object.assign({}, this.addFormGroup.value);
    if(rental.rentDate&&rental.returnDate){
      rental.carId = this.currentCarId;
      this.rentDate = rental.rentDate;
      this.returnDate = rental.returnDate;

      this.rentalService.checkRentingConditions(rental).subscribe(response=>{
        this.toastrService.success(response.message);
        this.router.navigate(["payment"+"/"+ this.currentCarId +"/"+ this.calculateDiff() + "/" + this.rentDate + "/" + this.returnDate ])
        this.toastrService.success();
      },response => {
        this.toastrService.error(response.error.message);
      }
      ); 
      
    } else {
      this.toastrService.error('please select a range');
    }
  }

}
