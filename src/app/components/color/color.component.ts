import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  currentColor:Color;
  dataLoaded = false;

  constructor(private colorService:ColorService){}
  
  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data 
      this.dataLoaded = true
    })
  }

setCurrentColor(color:Color) {
  this.currentColor = color
}
setCurrentColorClass(color:Color){
  if(color == this.currentColor){
    return "list-group-item list-group-item-action bg-neon-green text-anthracite2  "
  }else{
    return "list-group-item bg-grey300 text-black"
  }
}

}
