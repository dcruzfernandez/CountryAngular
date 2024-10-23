import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries:Country[]=[];

  public cargando:boolean=false;
  public valorInicial:string='';

  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    if(this.countriesService.cacheStore.byCapital.term.length===0) return;

    this.countries=this.countriesService.cacheStore.byCapital.countries;
    this.valorInicial=this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(capital:string):void{
      this.cargando=true;
      this.countriesService.search(capital,'capital')
      .subscribe(resp=>{
        this.countries=resp;
        this.cargando=false;
        console.log(this.countries);
      });
  }
}

// https://restcountries.com/v3.1/capital/{capital}