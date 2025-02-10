import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BuyComponent } from '../buy/buy.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { PageProductComponent } from '../page-product/page-product.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'buy',component:BuyComponent},
    {path:'carrinho',component:CarrinhoComponent},
    {path:'produto',component:PageProductComponent}
];
