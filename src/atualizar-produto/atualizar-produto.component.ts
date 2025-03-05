import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { identity } from 'rxjs';
import { Produto } from '../models/Produto';
import { error } from 'node:console';

@Component({
  selector: 'app-atualizar-produto',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './atualizar-produto.component.html',
  styleUrl: './atualizar-produto.component.css'
})
export class AtualizarProdutoComponent {

constructor(private router:Router,private service:ServicoService){

}

pesquisaResultado:boolean=false
produto:Produto
tamanhos:string[]=[]


pesquisa=new FormGroup({
  id:new FormControl('148219fc-b843-4030-bd07-62e0be202943',Validators.required)

})

pesquisar(){
  const produto={
    id:this.pesquisa.get('id').value
  }
  this.service.pesquisaId(produto.id).subscribe({
    next:(response)=>{
      console.log("Produto encontrado!!")  
      this.produto=response
      this.pesquisaResultado=true
      this.tamanhos=response.tamanhos
      this.setarProduto()
    },error:(error)=>{
        console.log("Produto não encontrado!!")
    },complete:()=>{
      console.log("Requisição completa!!")

    }

  })

}

setarProduto(){
  this.formProduto.setValue({
    nome: this.produto.nome,
    descricao: this.produto.descricao,
    imagem: this.produto.imagem,
    imagem2: this.produto.imagem2,
    imagem3: this.produto.imagem3,
    valor: this.produto.valor,
    valorPromocao: this.produto.valorPromocao,
    promocao: Boolean(this.produto.promocao),
    categoria: this.produto.categoria,
    tamanhos: '',
    quantidadeEstoque: this.produto.quantidadeEstoque
  })

  
}

verfiTamanhos(){
    if(this.tamanhos.length>0){
      return false
    }

    return true
}

formProduto=new FormGroup({
    nome:new FormControl('',Validators.required),
    descricao:new FormControl('',Validators.required),
    imagem:new FormControl('',Validators.required),
    imagem2:new FormControl('',Validators.required),
    imagem3:new FormControl('',Validators.required),
    valor:new FormControl(null,Validators.required),
    valorPromocao:new FormControl(null,Validators.required),
    promocao:new FormControl(null,Validators.required),
    categoria:new FormControl('',Validators.required),
    tamanhos:new FormControl(''),
    quantidadeEstoque:new FormControl(null,Validators.required),
})


atualizarProduto(){
  const produto:Produto={
    nome: this.formProduto.get('nome').value,
    descricao: this.formProduto.get('descricao').value,
    imagem: this.formProduto.get('imagem').value,
    imagem2: this.formProduto.get('imagem2').value,
    imagem3: this.formProduto.get('imagem3').value,
    valor: this.formProduto.get('valor').value,
    valorPromocao: this.formProduto.get('valorPromocao').value,
    promocao: this.formProduto.get('promocao').value,
    categoria: this.formProduto.get('categoria').value,
    tamanhos: this.tamanhos,
    quantidadeEstoque: this.formProduto.get('quantidadeEstoque').value,
    quantidade: 0
  }
  console.log(produto)
  this.service.atualizarProduto(this.produto.id,produto).subscribe({
    next:(response)=>{
       console.log("Produto Atualizado"+response)
       this.formProduto.reset()
    },error:(error)=>{
        console.log("Produto não atualizado!!"+error)
    },complete:()=>{
        console.log("Requição completa!!")
    }

  })
}

adicionarTamanho(){
  
  
  if(this.formProduto.get('tamanhos').value.trim()!=="" && this.tamanhos.length<=10){
    let tamanho:any=this.formProduto.get('tamanhos').value
    this.tamanhos.push(tamanho)
  }
  

  
}
removerTamanho(){
this.tamanhos.pop()
}

voltar(){
  this.router.navigate(['adm'])
}


}
