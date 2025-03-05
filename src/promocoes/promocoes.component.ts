import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promocoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promocoes.component.html',
  styleUrl: './promocoes.component.css'
})
export class PromocoesComponent {

constructor(private service:ServicoService){

}
 

produtos:Produto[]
produtoPagina:number
produtoPaginas:number[]
estoque:boolean=true
promocao:number


estoqueVerif(estoque:number):boolean{
  if(estoque>0){
      return true
  }
  return false
}



ngOnInit(){
  this.mostrarProdutos()
}


pagina:number=0
tamanho:number=2



mudarPagina(pagina:number){
    this.pagina=pagina
    this.mostrarProdutos()
    console.log(this.pagina)
}

mostrarProdutos(){
  this.produtoPaginas=[]
  this.service.listarPromocoesPage(this.pagina,this.tamanho).subscribe(sub=>{
    this.produtos=sub.content
    this.produtoPagina=sub.totalPages

    this.mostrarBarra()
  })

  
}


mostrarBarra(){
  for(let i=1;i<=this.produtoPagina;i++){
    this.produtoPaginas.push(i)   
  }
}

paginaProduto(id:string){

this.service.pesquisaPaginaProduto(id)

}







}
 