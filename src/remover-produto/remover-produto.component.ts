import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';
import { response } from 'express';

@Component({
  selector: 'app-remover-produto',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './remover-produto.component.html',
  styleUrl: './remover-produto.component.css'
})
export class RemoverProdutoComponent {


constructor(private router:Router,private service:ServicoService){

}

mostrarTabela:boolean=false
produto:Produto
removerMsg:boolean=false
removerComplet:boolean=false

voltarRemover(){
  this.removerMsg=false
}

removerCompleto(){
  this.removerComplet=true
  this.removerMsg=false

  this.service.removerProduto(this.produto.id).subscribe({
    next:(response)=>{
        console.log("Produto Removido!!")
    },error:()=>{
        console.log("Erro ao remover Produto!!")
    },complete:()=>{
      console.log("Requisição completa!!")

    }
  })
}
fecharModal(){
  this.removerComplet=false
  this.mostrarTabela=false
  this.pesquisa.reset()
}

remover(){
  this.removerMsg=true
}

voltar(){
  this.router.navigate(['adm'])
}



pesquisa=new FormGroup({
  id:new FormControl('',Validators.required)

})

pesquisar(){
  const produto={
    id:this.pesquisa.get('id').value
  }
  this.service.pesquisaId(produto.id).subscribe({
    next:(response)=>{
      console.log("Produto encontrado!!")  
      this.mostrarTabela=true
      this.produto=response

    },error:(error)=>{
        console.log("Produto não encontrado!!")

    },complete:()=>{
      console.log("Requisição completa!!")

    }

  })

}

}
