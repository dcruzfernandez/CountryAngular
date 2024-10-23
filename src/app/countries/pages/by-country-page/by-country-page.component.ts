import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries:Country[] =[];
  public cargando:boolean=false;
  public valorInicial:string='';

  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    if(this.countriesService.cacheStore.byCapital.term.length===0) return;

    this.countries=this.countriesService.cacheStore.byCountry.countries;
    this.valorInicial=this.countriesService.cacheStore.byCountry.term;
  }

  searchByName(country:string):void{
      this.cargando=true
      this.countriesService.search(country,'name')
      .subscribe(resp=>{
        this.countries=resp;
        this.cargando=false;
        console.log(this.countries);
      });
  }
}
