import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '../models/Endereco';
import { Cupom } from '../models/Cupom';
import { Carrinho } from '../models/Carrinho';
import { Produto } from '../models/Produto';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent {

constructor(private service:ServicoService){

}

pix:boolean=false 
metodoPag:string="slamos"
total:number=0
cep:Endereco
cupomValor:Cupom
cupomValidado:boolean=false
produto:Produto[]=[]
cupomNome:Cupom
mostrarPopUp:boolean=false
mostrarPix:boolean=true
pagamentoRealizado:boolean=false



nomeUsuario:string=localStorage.getItem("nome")



anexarCarrinho(){
  this.service.listaCarrinho().subscribe(sub=>{
    this.produto=sub
  })
}

xFechar(){
  this.mostrarPopUp=false
}



pagamentoCompleto=new FormGroup({
  cep:new FormControl('',[Validators.required]),
  estado:new FormControl('',[Validators.required]),
  cidade:new FormControl('',[Validators.required]),
  bairro:new FormControl('',[Validators.required]),
  complemento:new FormControl('',[Validators.required]),
  casalote:new FormControl('',[Validators.required]),
  total:new FormControl(this.total),
  metodoPagamento:new FormControl('',[Validators.required])
})

cupom=new FormGroup({
  nome:new FormControl('',[Validators.required])
})


gerarPix(){
const carrinho:Carrinho={
    nome:this.nomeUsuario,
    produtos:this.produto,
    cupom:this.cupomValor  
}
this.service.finalizarCompra(carrinho).subscribe({
  next:(response)=>{
    console.log("Carrinho enviado:"+response)
  },error:(error)=>{
    console.log("Não foi possivel enviar carrinho:"+error)

  },complete:()=>{
      console.log("Concluido com sucesso!!")

  }
  })
}




verificarCep(cep:string){
  if(cep.length==8){
    this.service.buscarEndereco(cep).subscribe(sub=>{
      this.cep=sub
  
      this.pagamentoCompleto.patchValue({
        estado:this.cep.state,
        cidade:this.cep.city,
        bairro:this.cep.neighborhood,
        complemento:this.cep.street
        
  
      })
    })
  }
  





  console.log(cep)
}


mostrarPixx(){
  this.mostrarPix=false

  setInterval(()=>{
    this.pagamentoRealizado=true
  },10000)
}


copiarCodigo() {
  navigator.clipboard.writeText(this.qrCode2).then(() => {
    alert('Codigo pix copiado');
  }).catch(err => {
    console.error('Erro ao copiar texto: ', err);
  });
}


ngOnInit(){
  this.metodoDePagamento()
  this.anexarCarrinho()
}

mostrarTotal(){
  this.service.listaTotal().subscribe(sub=>{
    this.total=sub
  })
}


metodoDePagamento(){
  this.pagamentoCompleto.get('metodoPagamento').valueChanges.subscribe(sub=>{

    if(sub=="1"){
      this.pix=true
      this.metodoPag="pix"
      this.mostrarTotal()
    }else{
      this.pix=false
      this.metodoPag=null
    }

  })


}

mostrarPop(){

this.mostrarPopUp=true
console.log(this.mostrarPopUp)

}



verificarCupom(){
  const cupom=this.cupom.get("nome").value
  this.service.verificarCupom(cupom)
  this.service.retornarCupom().subscribe(sub=>{
    this.cupomValor=sub
    if(this.cupomValor.valor>0 && this.cupomValor.valido==true){
        this.total=this.total-(this.total/100*this.cupomValor.valor)
       this.cupom.get('nome').disable()
       this.cupomValidado=true
       
        console.log(this.cupomValor.nome)
    }
  })


}



qrCode2:string="00020126470014BR.GOV.BCB.PIX0125mateusbarbosasa@gmail.com5204000053039865802BR5901N6001C62070503***6304A9D6"
qrCode:string="data:image/png;base64,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"

  
  

}
