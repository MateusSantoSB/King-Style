import { Component } from '@angular/core';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '../models/Endereco';
import { Cupom } from '../models/Cupom';
import { Carrinho } from '../models/Carrinho';
import { Produto } from '../models/Produto';
import * as QRCode from 'qrcode';

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
pixCode:string=""
btnMostrarPix:boolean=true


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
  this.btnMostrarPix=false
this.gerarQrCode()
  
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

gerarQrCode(){
  console.log(this.total)
  
  let total:number=parseFloat(this.total.toFixed(2))
  if(this.total==0){
    total=0.1
  }

  const dadosPix={
    nomeDestinatario:"Mateus dos santos barbosa",
    chaveDestinatario:"mateusbarbosasa@Gmail.com",  
    valor:total,
    cidadeRementente:"Brasilia-DF",
    descricao:"Compras Kyng Style"
  }
    this.service.gerarPagamentoPix(dadosPix).subscribe({
      next:(response)=>{
        console.log("Dados pix "+response.pix)

        QRCode.toDataURL(response.pix, (err, url) => {
          if (err) {
            console.error('Erro ao gerar QR Code', err);
          } else {
            this.qrCode= url;
          }
        });


      },error:()=>{
        console.log("Erro pix")
      }
    })


  


}

qrCode2:string="00020126470014BR.GOV.BCB.PIX0125mateusbarbosasa@gmail.com5204000053039865802BR5901N6001C62070503***6304A9D6"
  qrCode:string=""
  

}
