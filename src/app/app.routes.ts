import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BuyComponent } from '../buy/buy.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { PageProductComponent } from '../page-product/page-product.component';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { PromocoesComponent } from '../promocoes/promocoes.component';
import { AdmProdutoComponent } from '../adm-produto/adm-produto.component';
import { LoginComponent } from '../login/login.component';
import { authenticationGuard } from '../servicosHTTP/authGuardAdm/authentication.guard';
import { userguardGuard } from '../servicosHTTP/authGuardUser/userguard.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'buy',component:BuyComponent},
    {path:'carrinho',component:CarrinhoComponent, canActivate:[userguardGuard] },
    {path:'produto',component:PageProductComponent},
    {path:'pesquisa',component:PesquisaComponent},
    {path:'promocoes',component:PromocoesComponent},
    {path:'admProduto',component:AdmProdutoComponent, canActivate:[authenticationGuard]},
    {path:'login',component:LoginComponent}
];
