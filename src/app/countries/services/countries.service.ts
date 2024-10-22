import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { Pais } from '../interfaces/pais';

@Injectable(
  {providedIn: 'root'})
export class CountriesService {
  
  private apiUrl:string='https://restcountries.com/v3.1';
  
  constructor(private http: HttpClient) { }

  searchCountry(code:string, tipo:string):Observable<Country | null>{
    return this.http
              .get<Country[]>(`${this.apiUrl}/${tipo}/${code}`)
              .pipe(
                map(countries=> countries.length>0?countries[0]:null),
                catchError(()=>of(null))
              );
  }

  search(clave:string, tipo:string):Observable<Country[]>{
    return this.http
              .get<Country[]>(`${this.apiUrl}/${tipo}/${clave}`)
              .pipe(catchError(error=>of([])));
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