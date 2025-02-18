import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {

constructor(private service:ServicoService){

}

pesquisa:Produto[]=[]
mostra:boolean=false

ngOnInit(){
  this.mostrarPesquisa()
}

mostrarPesquisa():boolean{
  this.pesquisa=null
  
  this.service.listarPesquisa().subscribe(sub=>{
    this.pesquisa=sub
  })
  if(this.pesquisa.length>0){
    return true
  }else{
    return false
  }

    
}

mostrarPaginaProduto(id:string){
  this.service.pesquisaPaginaProduto(id)
}












}
