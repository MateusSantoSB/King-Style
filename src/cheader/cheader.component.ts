import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import{FormControl,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {jwtDecode} from 'jwt-decode';



@Component({
  selector: 'app-cheader',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './cheader.component.html',
  styleUrl: './cheader.component.css'
})
export class CheaderComponent {


  pesquisarNome=new FormGroup({
    pesquisa:new FormControl('')
})


constructor(private router:Router,private service:ServicoService,@Inject(PLATFORM_ID) private platformId:object){
}

usuario:string
ngOnInit(){
  this.areaUsuario()

}


areaUsuario(){
 let token:string 

 if(isPlatformBrowser(this.platformId)){
  token=localStorage.getItem('token')
 }
  
  if(token!=null){
    const decoderJWT:any=jwtDecode(token)
    const nome=localStorage.getItem('nome')
    let role:string=decoderJWT.role

    if(role=="ADMIN"){
      this.usuario=nome
      return true
    }else{
      return false
    }
    
  }else{
    return false
  }
}

pesquisar(){

  const pesquisa=this.pesquisarNome.get('pesquisa').value
  
    this.service.pesquisarNome(pesquisa)
    this.router.navigate(['pesquisa'])

}


opcao:number=0




}
