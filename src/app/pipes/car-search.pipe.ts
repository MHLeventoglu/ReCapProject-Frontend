import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carSearch',
})
export class CarSearchPipe implements PipeTransform {
  transform(value: any[], filterText: string): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    let filteredCars: any[] = value.filter(
      (car) => car.description.toLocaleLowerCase().indexOf(filterText) !== -1
    );
    return filteredCars;
  }
}
