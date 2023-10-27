import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand;
  dataLoaded = false;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  
  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand:Brand) {
    this.currentBrand = brand
  }
  setCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item list-group-item-action bg-neon-green text-anthracite2  "
    }else{
      return "list-group-item bg-grey300 text-black"
    }
  }
}
