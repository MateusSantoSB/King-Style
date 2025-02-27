import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/Produto';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http:HttpClient) { }

  backUrl:string="http://localhost:8080"

  salvarProduto(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.backUrl+"/produto",produto);
  }

  login(login:Login):Observable<Login>{
    return this.http.post<Login>(this.backUrl+"/auth/login",login)
  } 


}
