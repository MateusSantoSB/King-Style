import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico.service';


@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
 
carrinho:Produto[]=[]
total:number=0
msg:string="Carrinho Vazio!!!"


  
constructor(private http:ServicoService){

}



ngOnInit(){
  this.mostrarCarrinho()
  this.mostrarTotal()

}


mostrarTotal(){
  
  this.http.listaTotal().subscribe(total=>
    this.total=total
  )
  if(this.total==0||this.total <0){
      return false
  }
      return true 
}

mostrarCarrinho(){
  this.http.listaCarrinho().subscribe(carrinho=>
    this.carrinho=carrinho
  )
}


  
 









}
