import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/Produto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private router:Router,private http:HttpClient) { }
  private carrinho:Produto[]=[]  
  private carrinhoSubject=new BehaviorSubject<Produto[]>([])
  carrinho$=this.carrinhoSubject.asObservable();

  private total=0
  totalSubject=new BehaviorSubject<number>(0)
  total$=this.totalSubject.asObservable()





  list():Observable<any>{
       const produtos=this.http.get<Produto[]>("http://localhost:8080/produto")
      
       return produtos
  }

  adicionarCarrinho(produto:Produto){
      this.carrinho.push(produto)
      this.carrinhoSubject.next([...this.carrinho])

      this.total+=produto.valor
      this.totalSubject.next(this.total)
    
    console.log(this.carrinho)

  }


  listaCarrinho(){
    return this.carrinho$
  }
  listaTotal(){
    return this.total$
  }



  produ:any
  pesquisaPaginaProduto(id:string){
    this.produ=this.http.get<Produto>("http://localhost:8080/produto/"+id)
    
    this.router.navigate(['produto'])
  }

  produtoPagina():Observable<any>{
    return this.produ
  }






}
