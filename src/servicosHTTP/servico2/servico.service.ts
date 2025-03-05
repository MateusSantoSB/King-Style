import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/Produto';
import { Login } from '../../models/Login';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { Registro } from '../../models/Registro';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http:HttpClient,private router:Router) { }

  backUrl:string="http://localhost:8080"

  salvarProduto(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.backUrl+"/produto",produto);
  }

  login(login:Login):Observable<any>{
    return this.http.post<Login>(this.backUrl+"/auth/login",login)
  } 

  registrar(registro:Registro):Observable<any>{
      return this.http.post<Registro>(this.backUrl+"/auth/register",registro)
  }

  salvarToken(token:string){
    const decoderJWT:any=jwtDecode(token)
    const nome=decoderJWT.sub
    localStorage.setItem('token',token)
    localStorage.setItem('nome',nome)
  }

  pegarToken(){
    return localStorage.getItem('token')
    
  }

  rota(){
      const token=localStorage.getItem('token')
      const decoderJWT:any=jwtDecode(token)
      if( decoderJWT.role=="ADMIN"){
        
        this.router.navigate(["/admProduto"])
      }else{
        this.router.navigate([""])
      }
    }

 

}
