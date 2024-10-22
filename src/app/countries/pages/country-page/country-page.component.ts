import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country:Country | null=null;

  constructor(private activatedRoute:ActivatedRoute,
              private countriesService:CountriesService,
              private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>this.countriesService.searchCountry(id,'alpha'))
      )
      .subscribe(data=>{
        if(!data){
          return this.router.navigateByUrl('');
        }
        return this.country=data;
        
      })
  }
}


// this.activatedRoute.params
    //   .subscribe(({id}) =>{
        
    //     this.countriesService.searchCountry(id,'alpha')
    //       .subscribe(country=>{
    //         console.log(country)
    //       })
    //   })
