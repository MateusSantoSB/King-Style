import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cupom } from '../models/Cupom';


@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
 
carrinho:Produto[]=[]
total:number=0
msg:string="Carrinho Vazio!!!"


cupomConsumido:boolean=false

  
constructor(private http:ServicoService){

}



ngOnInit(){
  this.mostrarCarrinho()
  this.mostrarTotal()

}

cupom=new FormGroup({
    nome:new FormControl('')
})




mostrarTotal(){
  
  this.http.listaTotal().subscribe(total=>
    this.total=total
  )
  
  if(this.total==0||this.total <0){
      return false 
    }
      return true
}

adicionar(produto:Produto){
  this.http.adicionarCarrinho(produto)
}

remover(produto:Produto){
  this.http.removerDoCarrinho(produto)
  this.mostrarTotal()
}
mostrarCarrinho(){
  this.http.listaCarrinho().subscribe(carrinho=>
    this.carrinho=carrinho
  )
}


  
 









}
