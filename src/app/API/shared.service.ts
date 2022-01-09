import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://universities.hipolabs.com/search";
  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get<any>(this.APIUrl);
  }

  Universidades(country: string){
    return this.http.get<any>(this.APIUrl+'?country='+ country)
    .pipe(map((res:any)=>{
      return res;
  }))
  }

  UniversidadesDetalhes(name: string){
    return this.http.get<any>(this.APIUrl+'?name='+ name)
    .pipe(map((res:any)=>{
      return res;
  }))
  }
}
