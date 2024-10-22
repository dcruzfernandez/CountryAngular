import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries:Country[] =[];

  constructor(private countriesService:CountriesService){}

  searchByName(country:string):void{
    
      this.countriesService.search(country,'name')
      .subscribe(resp=>{
        this.countries=resp;
        console.log(this.countries);
      });
  }
}
