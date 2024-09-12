import { Subscription } from 'rxjs';
import { ICart } from './../../core/interfaces/icart';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountItemsService } from '../../core/services/count-items.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  // Call Services
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _CountItemsService = inject(CountItemsService);

  // Variable to Store Data
  cartDetails: ICart = {} as ICart;

  // Create Variable to UnSubscribe
  getProductsCartSum!: Subscription;
  deleteSpecificItemSum!: Subscription;
  updataQuantitySum!: Subscription;
  clearCartSum!: Subscription;

  ngOnInit(): void {
    this.getProductsCartSum = this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
    });
  }

  removeItem(id: string): void {
    this.deleteSpecificItemSum = this._CartService
      .deleteSpecificCartItem(id)
      .subscribe({
        next: (res) => {
          this._CountItemsService.removeItem();
          this._ToastrService.success(
            'Product removed successfully from your cart',
            '',
            {
              timeOut: 1900,
              closeButton: true,
              progressBar: true,
            }
          );
          this.cartDetails = res.data;
        },
      });
  }

  updataCount(id: string, newCount: number): void {
    this.updataQuantitySum = this._CartService
      .updataProductQuantity(id, newCount)
      .subscribe({
        next: (res) => {
          this._ToastrService.success('Updata quantity successfully', '', {
            timeOut: 1900,
            closeButton: true,
            progressBar: true,
          });
          this.cartDetails = res.data;
        },
      });
  }

  removeAllProducts(): void {
    this.clearCartSum = this._CartService.clearCart().subscribe({
      next: (res) => {
        this._CountItemsService.resetCart();
        if (res.message == 'success') {
          this.cartDetails = {} as ICart;
          this.cartDetails.totalCartPrice == 0;
          this._Router.navigate(['/home']);
          this._ToastrService.success('Removed all prouducts successfully', '', {
            timeOut: 1900,
            closeButton: true,
            progressBar: true,
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.getProductsCartSum?.unsubscribe();
    this.deleteSpecificItemSum?.unsubscribe();
    this.updataQuantitySum?.unsubscribe();
    this.clearCartSum?.unsubscribe();
  }
}
