import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicoService } from '../servicosHTTP/servico2/servico.service';
import { error } from 'console';
import { authenticationGuard } from '../servicosHTTP/authGuardAdm/authentication.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private service:ServicoService){

}


login:boolean=true
registrar:boolean=false
sair:boolean=false

erroCredenciais:string=""
erroCredenciaisBool:boolean=false

  irRegistrar(){
    this.sair=true

    setTimeout(() => {
      this.login = false; 
      this.sair = false;    
    }, 800);
  }

  irLogin(){
      this.login = true; 
      this.sair = false;    
  }


  loginDados=new FormGroup({
    login:new FormControl(''),
    senha:new FormControl('')
})

credenciaisErro(){
  this.erroCredenciais="Verifique seus dados!!"
  this.erroCredenciaisBool=true
  setInterval(()=>{
    this.erroCredenciaisBool=false
  },5000)

}


logar(){
  const login={
    login:this.loginDados.get('login').value,
    senha:this.loginDados.get('senha').value
  }

  this.service.login(login).subscribe({
    next:(response)=>{
      console.log("Usuario logado!!")
      let token:string=response.token
      
      this.service.salvarToken(token);
      this.service.rota()
    },
    error:(error)=>{
      console.log("Usuario não logado!!",error)
      this.credenciaisErro()
      this.loginDados.reset()
    },complete(){
      console.log("Requisição completa!!")
    }


  })

}
   


}
