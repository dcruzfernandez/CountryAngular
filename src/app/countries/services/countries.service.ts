import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Pais } from '../interfaces/pais.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../interfaces/region.type';

@Injectable(
  {providedIn: 'root'})
export class CountriesService {
  
  private apiUrl:string='https://restcountries.com/v3.1';

  public cacheStore:CacheStore={
    byCapital:{term:'',countries:[]},
    byCountry:{term:'',countries:[]},
    byRegion:{region:'',countries:[]}
  }
  public clave:string="";
  
  constructor(private http: HttpClient) { 
    this.cargarCache();
  }

  private guardarCache(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private cargarCache(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
  }

  searchCountry(code:string, tipo:string):Observable<Country | null>{
    return this.http
              .get<Country[]>(`${this.apiUrl}/${tipo}/${code}`)
              .pipe(
                map(countries=> countries.length>0?countries[0]:null),
                catchError(()=>of(null))
              );
  }

  search(term:string | Regions, tipo:string):Observable<Country[]>{
    //this.clave=clave;
    return this.http
              .get<Country[]>(`${this.apiUrl}/${tipo}/${term}`)
              .pipe(
                tap(countries=>{
                  if(tipo=='capital'){
                    this.cacheStore.byCapital={term,countries};
                  }else if(tipo=='name'){
                    this.cacheStore.byCountry={term,countries};
                  }else{
                    const region:Regions=term as Regions
                    this.cacheStore.byRegion={region,countries};
                  }
                }),
                tap(()=>this.guardarCache()),
                // delay(1000),
                catchError(error=>of([]))
              );
  }

  

  getCountries(): Observable<Pais[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all`).pipe(
      map(paises => paises.map(p => ({
        name: p.name.common,
        flag: p.flags.png,
        capital: p.capital ? p.capital[0] : 'No tiene',
        population: p.population,
        icon: p.flags.svg
      }))),
      catchError(error=>of([]))
    );
  }
  
}