import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http:HttpClient) { }

  backUrl:string="http://localhost:8080"

  salvarProduto(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.backUrl+"/produto",produto);
  }


}
