import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-pesquisa-produto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './pesquisa-produto.component.html',
  styleUrl: './pesquisa-produto.component.css'
})
export class PesquisaProdutoComponent {

  constructor(private router:Router,private service:ServicoService){

  }

  produtos:Produto[]=[]
  mostrarTabela:boolean=false

  pesquisa=new FormGroup({
  nome:new FormControl('')
  

})


  pesquisar(){
    const pesquisa={
      nome:this.pesquisa.get('nome').value
    }

    this.service.searchNome(pesquisa.nome).subscribe({
        next:(response)=>{
          console.log("Lista capturada!!")
          this.produtos=response.content
          this.mostrarTabela=true
          console.log(this.produtos)
        },error:()=>{
          console.log("Erro na lista")

        },complete:()=>{
          console.log("Requisição completa!")
        }

    })


  }


  copiarId(id:string){
    navigator.clipboard.writeText(id).then(() => {
      alert('Id do produto copiado');
    }).catch(err => {
      console.error('Erro ao copiar texto: ', err);
    });
  }

  
  voltar(){
    this.router.navigate(['adm'])
  }
}
