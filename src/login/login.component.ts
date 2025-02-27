import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicoService } from '../servicosHTTP/servico2/servico.service';
import { error } from 'console';

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

logar(){
  const login={
    login:this.loginDados.get('login').value,
    senha:this.loginDados.get('senha').value
  }

  this.service.login(login).subscribe({
    next:(response)=>{
      console.log("Usuario logado!!",response)
      
    },
    error:(error)=>{
      console.log("Usuario não logado!!",error)
    },complete(){
      console.log("Requisição completa!!")
    }


  })

}
   


}
