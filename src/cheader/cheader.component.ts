import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ServicoService } from '../servicosHTTP/servico1/servico.service';
import{FormControl,FormGroup,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';



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


constructor(private router:Router,private service:ServicoService){
}


ngOnInit(){


}


pesquisar(){

  const pesquisa=this.pesquisarNome.get('pesquisa').value
  
    this.service.pesquisarNome(pesquisa)
    this.router.navigate(['pesquisa'])

}


opcao:number=0




}
