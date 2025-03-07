import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../../models/Produto';
import { Router } from '@angular/router';
import { Cupom } from '../../models/Cupom';
import { Endereco } from '../../models/Endereco';
import { Carrinho } from '../../models/Carrinho';

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


  private pesquisaProdutoSubject=new BehaviorSubject<Produto[]>([])
  private pesquisaProduto$=this.pesquisaProdutoSubject.asObservable()

 
//Atualizar Produto

atualizarProduto(id:string,produto:Produto):Observable<any>{
  return this.http.put<any>("http://localhost:8080/produto/att/"+id,produto)


}

//remover Produto

removerProduto(id:string):Observable<Produto>{
 return this.http.delete<Produto>("http://localhost:8080/produto/del/"+id)
}



//Listar Produtos
  listaHomePage(pagina:number,tamanho:number):Observable<any>{
       const produtos=this.http.get<Produto[]>("http://localhost:8080/produto/home?pagina="+pagina+"&tamanho="+tamanho)
         
       return produtos
  }



//=====================================================//



//pesquisa produto ADM
searchNome(pesquisa:string):Observable<any>{
  const pagina:number=0
  const tamanho:number=10    

    return this.http.get<any>("http://localhost:8080/produto/search/?nome="+pesquisa+"&pagina="+pagina+"&tamanho="+tamanho)
}


  //Pesquisar Produto
  pesquisarNome(pesquisa:string){
    const pagina:number=0
    const tamanho:number=10    

      this.http.get<any>("http://localhost:8080/produto/search/?nome="+pesquisa+"&pagina="+pagina+"&tamanho="+tamanho).subscribe(sub=>{
          this.pesquisaProdutoSubject.next(sub.content)

      })
  }

  listarPesquisa():Observable<any>{

    return this.pesquisaProduto$
  }

  pesquisaId(id:string):Observable<Produto>{
   return this.http.get<Produto>("http://localhost:8080/produto/"+id)
  }
//=====================================================//
   
//promocoes
listarPromocoesPage(pagina:number,tamanho:number):Observable<any>{
  const produtosPage=this.http.get<any>("http://localhost:8080/produto/promocao?pagina="+pagina+"&tamanho="+tamanho)

  return produtosPage
}
//

 
//Carrinho
  adicionarCarrinho(produto:Produto){


    let pesquisa=this.carrinho.find(pes=>pes.id==produto.id && pes.tamanhos[0]==produto.tamanhos[0])
 
    if(pesquisa!=undefined){
      
      pesquisa.quantidade+=1 
        console.log(pesquisa.nome)

    }else{
      produto.quantidade=1
      this.carrinho.push(produto)
      this.carrinhoSubject.next([...this.carrinho])

    }


    if(produto.promocao==true){
        this.total+=produto.valor-(produto.valor/100*produto.valorPromocao)
        this.totalSubject.next(this.total)
    }else{

      this.total+=produto.valor
      this.totalSubject.next(this.total)
    }   
}
removerDoCarrinho(id:string){
  let index=this.carrinho.findIndex(pesquisaId=>pesquisaId.id==id)
  let pesquisa=this.carrinho[index]
  pesquisa.quantidade-=1
  if(pesquisa.quantidade>0){

    if(pesquisa.promocao==true){
        this.total-=pesquisa.valor-(pesquisa.valor/100*pesquisa.valorPromocao)
        this.totalSubject.next(this.total)
    }else{
      this.total-=pesquisa.valor
      this.totalSubject.next(this.total)
    }  



  }else{
   

    if(pesquisa.promocao==true){
      this.total-=pesquisa.valor-(pesquisa.valor/100*pesquisa.valorPromocao)
      this.totalSubject.next(this.total)
    }else{
    this.total-=pesquisa.valor
    this.totalSubject.next(this.total)
    }
    
    let indice=this.carrinho.indexOf(pesquisa)
    this.carrinho.splice(indice,1)
    this.carrinhoSubject.next([...this.carrinho])
   

  }

}


  listaCarrinho(){
    return this.carrinho$
  }
  listaTotal(){
      return this.total$
  }

//=====================================================//


//Pagina Produto
  produ:any
  pesquisaPaginaProduto(id:string){
    this.produ=this.http.get<Produto>("http://localhost:8080/produto/"+id)
    
    this.router.navigate(['produto'])
  }

  produtoPagina():Observable<any>{
    return this.produ
  }
  //=====================================================//



  //cupom
  cupom:any
  verificarCupom(nomeCupom:string){
      this.cupom=this.http.get<Cupom>("http://localhost:8080/cupom/search?nome="+nomeCupom)
  
  }

  retornarCupom():Observable<any>{
    return this.cupom
  }
  //



  //Endereco
  buscarEndereco(cep:string):Observable<Endereco>{
    const endereco=this.http.get<Endereco>("https://brasilapi.com.br/api/cep/v2/"+cep)
  
    return endereco

  }
  //======================//



  //buy

  finalizarCompra(carrinho:Carrinho):Observable<Carrinho>{
   return this.http.post<Carrinho>("http://localhost:8080/carrinho",carrinho)
  }



}
