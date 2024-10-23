import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Regions } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent  implements OnInit{
  public countries:Country[] =[];
  public cargando:boolean=false;
  public selected?:Regions;


  public regions:Regions[]=['Africa','Americas','Asia','Europe','Oceania']

  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    if(this.countriesService.cacheStore.byRegion.region.length===0) return;

    this.countries=this.countriesService.cacheStore.byRegion.countries;
    this.selected=this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region:Regions):void{
      this.cargando=true;
      this.selected=region;
      this.countriesService.search(region,'region')
      .subscribe(resp=>{
        this.countries=resp;
        this.cargando=false;
        console.log(this.countries);
      });
  }
}
