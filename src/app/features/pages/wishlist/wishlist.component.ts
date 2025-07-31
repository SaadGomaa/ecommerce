import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountItemsService } from '../../services/count-items.service';
import { Subscription } from 'rxjs';
import { WishListService } from '../../services/wish-list.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  // Call Services
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CountItemsService = inject(CountItemsService);

  // Variable to Store Data
  allWishList: IProduct[] = [];

  // Create Variable to UnSubscribe
  gitWishListItemsSum!: Subscription;
  addProductToCartSum!: Subscription;
  removeFromWishListSum!: Subscription;


  ngOnInit(): void {
    this.gitWishListItemsSum = this._WishListService.gitWishListItems().subscribe({
      next: (res) => {
        this.allWishList = res.data;
      },
    });
  }

  addToCart(id: string): void {
    this.addProductToCartSum = this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._CountItemsService.addItem();
        this._ToastrService.success('Product added successfully to your cart', '', {
          timeOut: 1900,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  removeItemWish(product: any): void {
    this.removeFromWishListSum = this._WishListService.removeFromWishList(product).subscribe({
      next: (res) => {
        this._CountItemsService.removeItemWish()
        this._WishListService.gitWishListItems().subscribe({
          next: (res) => {
            this.allWishList = res.data;
          },
        });
        this._ToastrService.success('Product removed successfully from your wishlist', '', {
          timeOut: 1900,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.gitWishListItemsSum?.unsubscribe();
    this.addProductToCartSum?.unsubscribe();
    this.removeFromWishListSum?.unsubscribe();
  }
}
