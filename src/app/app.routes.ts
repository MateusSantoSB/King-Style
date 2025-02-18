import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BuyComponent } from '../buy/buy.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { PageProductComponent } from '../page-product/page-product.component';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { PromocoesComponent } from '../promocoes/promocoes.component';
import { AdmProdutoComponent } from '../adm-produto/adm-produto.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'buy',component:BuyComponent},
    {path:'carrinho',component:CarrinhoComponent},
    {path:'produto',component:PageProductComponent},
    {path:'pesquisa',component:PesquisaComponent},
    {path:'promocoes',component:PromocoesComponent},
    {path:'admProduto',component:AdmProdutoComponent}
];
