import { Component, Input, OnInit, Pipe } from '@angular/core';
import { SharedService } from '../API/shared.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrls: ['./universidades.component.css']
})
export class UniversidadesComponent implements OnInit {

  constructor(private service:SharedService) { }

  UniversidadeList!: any;
  UniversidadeSingle!: any;
  UniversidadeDetalhe!: any;

  @Input()
  country!: string; 
  name!: string; 
  default_country!: string;
  name_pesquisa!: string;


  ngOnInit(): void {
    this.default_country = "Portugal";
    this.GetPaises();
    this.GetDefaultList(this.default_country);
  }

  GetPaises(){
    this.service.getData()
    .subscribe(res=>{
        this.UniversidadeList=res;
        console.log(this.UniversidadeList);
        const result = Array.from(this.UniversidadeList.reduce((m: { set: (arg0: any, arg1: any) => any; }, t: { country: any; }) => m.set(t.country, t), new Map()).values());              
        console.log(result);
        this.UniversidadeList = result;
        this.UniversidadeList.sort((a: { country: string; }, b: { country: any; }) => a.country.localeCompare(b.country))
      })
  }

  GetDefaultList(default_country: string){
     this.service.Universidades(default_country)
    .subscribe(res=>{
      this.UniversidadeSingle=res;
      console.log(this.UniversidadeSingle);
    })
  }

  GetUniversidades(country: string){
    this.service.Universidades(country)
    .subscribe(res=>{
      this.UniversidadeSingle=res;
      console.log(this.UniversidadeSingle);
      if(this.UniversidadeSingle == "")
      {
        alert("Selecione um País")
        this.GetDefaultList(this.default_country);
      }
    })
  }

  GetUniversidadesDetalhes(name: string){
    this.service.UniversidadesDetalhes(name)
    .subscribe(res=>{
      this.UniversidadeDetalhe=res;
      console.log(name);
      console.log(this.UniversidadeDetalhe);
    })
  }

  GetUniversidadePesquisa(name_pesquisa:string){
    this.service.UniversidadesDetalhes(name_pesquisa)
    .subscribe(res=>{
      this.UniversidadeSingle=res;
      if(this.UniversidadeSingle == "")
      {
        alert("Essa Universidade não existe!");
        this.GetDefaultList(this.default_country);
      }
    })
  }

  

}

