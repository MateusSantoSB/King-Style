import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.css'
})
export class AdmComponent {

constructor(private router:Router){

}


nomeADM:string=localStorage.getItem('nome')



salvarProduto(){
  this.router.navigate(['/admProduto'])
}

removerProduto(){
this.router.navigate(['/removerProduto'])
}

atualizarProduto(){
  this.router.navigate(['/atualizarProduto'])
}

pesquisarProduto(){
  this.router.navigate(['/pesquisarProduto'])
}





}
