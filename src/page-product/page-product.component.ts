import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { console } from 'inspector';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css'
})
export class PageProductComponent {



  constructor(private service:ServicoService){

  }


  produto:Produto
  msgAdicionado:string
  imagem:string=""


  ngOnInit(){
      this.mostrarProduto()
  }


  mostrarProduto(){
    if(this.service.produtoPagina()!=null){
      this.service.produtoPagina().subscribe(sub=>{
        this.produto=sub
        this.imagem=this.produto.imagem

      })
    }
    
  }


  trocarPrincipal(imagem:string){
    this.imagem=imagem

    
  }


  adicionarCarrinho(produto:Produto){
      this.service.adicionarCarrinho(produto)
  }
  adicionado(){
    this.msgAdicionado="Produto Adicionado ao carrinho!!"
    return true
  }




}
