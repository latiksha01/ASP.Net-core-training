import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuardService } from './product-guard.service';

export const routes: Routes = [
    {path : 'home', component: HomeComponent},
    {path : 'product', component: ProductComponent},
    {path : 'contact', component: ContactComponent},
    {path : 'product/:id', component: ProductDetailComponent, canActivate: [ProductGuardService]},
    {path : '', redirectTo: 'home', pathMatch : 'full'},
    {path : '**', component: ErrorComponent}
];
