import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CatdetialsComponent } from './components/catdetials/catdetials.component';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate:[logedGuard],
    children: [
      { path: '',redirectTo:'login', pathMatch:'full' },
      { path: 'login', component: LoginComponent, title:'Login' },
      { path: 'register', component: RegisterComponent, title:'Register' },
      { path: 'forgot', component: ForgotPasswordComponent, title:'Forgot PassWord' },
    ],
  },
  {
    path: '', component: BlankLayoutComponent, canActivate:[authGuard],
    children: [
      { path: '', redirectTo:'home', pathMatch:'full' },
      { path: 'home', component: HomeComponent, title:'Home' },
      { path: 'product', component: ProductComponent, title:'Products' },
      { path: 'cart', component: CartComponent, title:'Cart' },
      { path: 'categories', component: CategoriesComponent, title:'Categories' },
      { path: 'brands', component: BrandsComponent, title:'Brands' },
      { path: 'details/:id', component: DetailsComponent, title:'Details' },
      { path: 'allorders', component: AllordersComponent, title:'All Orders' },
      { path: 'orders/:id', component: OrdersComponent, title:'Orders' },
      { path: 'catdetials/:id', component: CatdetialsComponent, title:'Categories Details' },
      { path: 'wishlist', component: WishlistComponent, title:'Wish List' },
    ],
  },
  { path: '**', component: NotfoundComponent, title:'NotFound' },
];
