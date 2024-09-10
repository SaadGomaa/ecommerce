import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../core/interfaces/iproduct';
import { CountItemsService } from '../../core/services/count-items.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CountItemsService = inject(CountItemsService);

  allWishList: IProduct[] = [];

  ngOnInit(): void {
    this._WishListService.gitWishListItems().subscribe({
      next: (res) => {
        this.allWishList = res.data;
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
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
    this._WishListService.removeFromWishList(product).subscribe({
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
    
  }
}
