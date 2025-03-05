import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicoService } from '../servicosHTTP/servico2/servico.service';
import { Produto } from '../models/Produto';
import { routes } from '../app/app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-produto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './adm-produto.component.html',
  styleUrl: './adm-produto.component.css'
})
export class AdmProdutoComponent {


constructor(private service:ServicoService,private router:Router){
}

tamanhos:string[]=[]
msgTamanhoMax:boolean=false
cadastrado:boolean=false

voltar(){
  this.router.navigate(['/adm'])
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

adicionarTamanho(){
  
  if(this.tamanhos.length==10){
    this.msgTamanhoMax=true
   
  }
  if(this.formProduto.get('tamanhos').value.trim()!=="" && this.tamanhos.length<10){
    const tamanho=this.formProduto.get('tamanhos').value
    console.log(tamanho)
    this.tamanhos.push(tamanho)
  }

}

salvarProduto(){

  const produto={
    nome:this.formProduto.get('nome').value,
    descricao:this.formProduto.get('descricao').value,
    imagem:this.formProduto.get('imagem').value,
    imagem2:this.formProduto.get('imagem2').value,
    imagem3:this.formProduto.get('imagem3').value,
    valor:this.formProduto.get('valor').value,
    valorPromocao:this.formProduto.get('valorPromocao').value,
    promocao:this.formProduto.get('promocao').value,
    categoria:this.formProduto.get('categoria').value,
    tamanhos:this.tamanhos,
    quantidade:0,
    quantidadeEstoque:this.formProduto.get('quantidadeEstoque').value,
  }
  console.log(produto)
  this.service.salvarProduto(produto).subscribe({
    next:(response)=>{
        console.log("Produto salvo",response)
        this.formProduto.reset()
        this.tamanhos=[]
        this.cadastrado=true
    },error:(error)=>{
      console.log("Produto não foi salvo",error)
    },complete(){
      console.log("Requisição do tipo Post concluida!!")
    }
  })




}














}
