import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
}) 
export class HomeComponent {
constructor(private router:Router,private service:ServicoService){

}




ngOnInit(){

  this.listProdutosAll();
  this.gerarPaginas()

}

products:Produto[];
carrinho:Produto[]=[];
total:number=0

pagina:number=0
tamanho:number=8

paginas:number[]=[]
paginaNumber:number


listProdutosAll(){
  this.paginas=[]  
  this.service.listaHomePage(this.pagina,this.tamanho).subscribe(sub=>{
      this.products=sub.content
      this.paginaNumber=sub.totalPages
      this.gerarPaginas()
    })
    
}


mudarPagina(i:number){
    this.pagina=i
    this.listProdutosAll()
}

gerarPaginas(){
  this.paginas=[]  
  for(let i=1;i<=this.paginaNumber;i++){
    this.paginas.push(i)
}
return true
}




addCart(indice:string){

  const produto=this.products.find(p=>p.id===indice)
  if(produto){
    this.service.adicionarCarrinho(produto)
  }
}


irPaginaProduto(id:string){

   this.service.pesquisaPaginaProduto(id)

}







}
