import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { CfooterComponent } from "../cfooter/cfooter.component";
import { CheaderComponent } from "../cheader/cheader.component";
import { CarrinhoComponent } from "../carrinho/carrinho.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, CfooterComponent, CheaderComponent, CarrinhoComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce';
}
