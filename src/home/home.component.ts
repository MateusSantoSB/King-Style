import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico.service';
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

  this.listProduct();

}

products:Produto[];
carrinho:Produto[]=[];
total:number=0

listProduct(){
    this.service.list().subscribe(respo=>{
      this.products=respo
    
    })
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
