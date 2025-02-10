import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheader',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cheader.component.html',
  styleUrl: './cheader.component.css'
})
export class CheaderComponent {

constructor(private router:Router){



}


to(event:any){
   const opcao=event.target.value;
  console.log(opcao)

switch(opcao){
  case '1':
    this.router.navigate([''])
    break
  case '2':
    this.router.navigate(['carrinho'])
    break
  case 3:
    
    break
}

 
     
    
  

}




}
