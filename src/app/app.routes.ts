import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { 
        path: 'login', 
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
      },
      { 
        path: 'register', 
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'Register'
      },
      { 
        path: 'forgot', 
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Forgot PassWord'
      },
    ],
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { 
        path: 'home', 
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'Home' 
      },
      { 
        path: 'product', 
        loadComponent: () => import('./components/product/product.component').then(m => m.ProductComponent),
        title: 'Products' 
      },
      { 
        path: 'cart', 
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart' 
      },
      { 
        path: 'categories', 
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories' 
      },
      { 
        path: 'brands', 
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands' 
      },
      { 
        path: 'details/:id', 
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
        title: 'Details' 
      },
      { 
        path: 'allorders', 
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'All Orders' 
      },
      { 
        path: 'orders/:id', 
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
        title: 'Orders' 
      },
      { 
        path: 'catdetials/:id', 
        loadComponent: () => import('./components/catdetials/catdetials.component').then(m => m.CatdetialsComponent),
        title: 'Categories Details' 
      },
      { 
        path: 'wishlist', 
        loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent),
        title: 'Wish List' 
      },
    ],
  },
  { 
    path: '**', 
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'NotFound' 
  },
];
