import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries:Country[] =[];

  constructor(private countriesService:CountriesService){}

  searchByRegion(region:string):void{
    
      this.countriesService.search(region,'region')
      .subscribe(resp=>{
        this.countries=resp;
        console.log(this.countries);
      });
  }
}
