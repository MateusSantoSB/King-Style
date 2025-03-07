import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css'
})
export class PageProductComponent {



  constructor(private service:ServicoService,private router:Router){

  }


  produto:Produto
  msgAdicionado:boolean=false
  imagem:string=""


irHome(){
  this.router.navigate([''])

}
irCarrinho(){
  this.router.navigate(['/carrinho'])
}


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


  adicionarCarrinho(){
    let tamanho:string=this.tamanhosForm.get("tamanho").value
    let produto:Produto={...this.produto, tamanhos:[tamanho]}

    this.service.adicionarCarrinho(produto)
    this.msgAdicionado=true

  
  }
  fechar(){
    this.msgAdicionado=false

  }


  tamanhosForm=new FormGroup({
       tamanho:new FormControl("",Validators.required)
  })



}
