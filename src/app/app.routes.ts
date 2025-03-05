import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BuyComponent } from '../buy/buy.component';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { PageProductComponent } from '../page-product/page-product.component';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { PromocoesComponent } from '../promocoes/promocoes.component';
import { AdmProdutoComponent } from '../salvar-produto/adm-produto.component';
import { LoginComponent } from '../login/login.component';
import { authenticationGuard } from '../servicosHTTP/authGuardAdm/authentication.guard';
import { userguardGuard } from '../servicosHTTP/authGuardUser/userguard.guard';
import { AdmComponent } from '../adm/adm.component';
import { AtualizarProdutoComponent } from '../atualizar-produto/atualizar-produto.component';
import { RemoverProdutoComponent } from '../remover-produto/remover-produto.component';
import { PesquisaProdutoComponent } from '../pesquisa-produto/pesquisa-produto.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'buy',component:BuyComponent, canActivate:[userguardGuard]},
    {path:'carrinho',component:CarrinhoComponent, canActivate:[userguardGuard] },
    {path:'produto',component:PageProductComponent},
    {path:'pesquisa',component:PesquisaComponent},
    {path:'promocoes',component:PromocoesComponent},
    {path:'admProduto',component:AdmProdutoComponent, canActivate:[authenticationGuard]},
    {path:'login',component:LoginComponent},
    {path:'adm',component:AdmComponent},
    {path:'atualizarProduto',component:AtualizarProdutoComponent},
    {path:'removerProduto',component:RemoverProdutoComponent},
    {path:'pesquisarProduto',component:PesquisaProdutoComponent}
];
