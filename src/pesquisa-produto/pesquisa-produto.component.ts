import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa-produto',
  standalone: true,
  imports: [],
  templateUrl: './pesquisa-produto.component.html',
  styleUrl: './pesquisa-produto.component.css'
})
export class PesquisaProdutoComponent {

  constructor(private router:Router){

  }

  voltar(){
    this.router.navigate(['adm'])
  }
}
