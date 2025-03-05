import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicoService } from '../servicosHTTP/servico2/servico.service';
import { error } from 'console';
import { authenticationGuard } from '../servicosHTTP/authGuardAdm/authentication.guard';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private service:ServicoService,private router:Router){

}


login:boolean=true
registrar:boolean=false
sair:boolean=false
userRegis:boolean=false

erroMsg:boolean=false

erroCredenciais:string=""
erroCredenciaisBool:boolean=false

  irRegistrar(){
    this.sair=true

    setTimeout(() => {
      this.login = false; 
      this.sair = false;    
    }, 200);
  }

  irLogin(){
      this.login = true; 
      this.sair = false;   
      this.registroDados.reset() 
  }


  loginDados=new FormGroup({
    login:new FormControl(''),
    senha:new FormControl('')
})

  registroDados=new FormGroup({
    login:new FormControl('',Validators.required),
    senha:new FormControl('',Validators.required),
    nome:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required)
  })




credenciaisErro(){
  this.erroCredenciais="Verifique seus dados!!"
  this.erroCredenciaisBool=true
  setInterval(()=>{
    this.erroCredenciaisBool=false
  },5000)

}

usuarioRegistrado(){
  this.userRegis=true
  setInterval(()=>{
    this.userRegis=false
  },5000)

}


registro(){
  const registrar={
    nome:this.registroDados.get('nome').value,
    login:this.registroDados.get('login').value,
    senha:this.registroDados.get('senha').value,
    email:this.registroDados.get('email').value
  }
  this.service.registrar(registrar).subscribe({
    next:(response)=>{
      console.log("Usuario registrado",response)
        this.usuarioRegistrado()
        this.registroDados.reset()

    },error:(error)=>{
      console.log("Usuario não registrado",error)
      this.erroMsg=true
      setInterval(()=>{
        this.erroMsg=false
      },5000)
    },complete:()=>{
      console.log("Requisção completa!!")
    }

  })


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
