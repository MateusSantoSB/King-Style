import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css'
})
export class PageProductComponent {



  constructor(private service:ServicoService){

  }


  produto:Produto
  msgAdicionado:string


  ngOnInit(){
      this.mostrarProduto()
  }


  mostrarProduto(){
    if(this.service.produtoPagina()!=null){
      this.service.produtoPagina().subscribe(sub=>{
        this.produto=sub
      })
    }
    
  }


  adicionarCarrinho(){
      this.service.adicionarCarrinho(this.produto)
  }
  adicionado(){
    this.msgAdicionado="Produto Adicionado ao carrinho!!"
    return true
  }




}
