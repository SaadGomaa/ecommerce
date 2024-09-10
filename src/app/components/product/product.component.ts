import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { CountItemsService } from '../../core/services/count-items.service';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, FormsModule, SearchPipe, TermtextPipe, NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  // Call Services
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CountItemsService = inject(CountItemsService);
  private readonly _WishListService = inject(WishListService);

  // Variable to Store Data
  productsList: IProduct[] = [];
  searchText: string = '';
  wishlistStatus: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._CountItemsService.addItem();
        if (res.status === 'success') {
          this._ToastrService.success(
            'Product added successfully to your cart',
            '',
            {
              timeOut: 1900,
              closeButton: true,
              progressBar: true,
            }
          );
        }
      },
    });
  }

  toggleWishList(product: IProduct) {
    if (this.wishlistStatus[product.id]) {
      this._WishListService.removeFromWishList(product).subscribe({
        next: (res) => {
          this._ToastrService.success(
            'Product removed successfully from your wishlist',
            '',
            {
              timeOut: 1900,
              closeButton: true,
              progressBar: true,
            }
          );
          this._CountItemsService.removeItemWish();
          this.wishlistStatus[product.id] = false;
        },
      });
    } else {
      this._WishListService.addToWishList(product).subscribe({
        next: (res) => {
          this._ToastrService.success(
            'Product added successfully to your wishlist',
            '',
            {
              timeOut: 1900,
              closeButton: true,
              progressBar: true,
            }
          );
          this._CountItemsService.addItemWish();
          this.wishlistStatus[product.id] = true;
        },
      });
    }
  }

  checkWishlistStatus(product: IProduct): void {
    this._WishListService.inWishList(product.id).subscribe({
      next: (isInWishlist) => {
        this.wishlistStatus[product.id] = isInWishlist;
      },
      error: (err) => {
        this.wishlistStatus[product.id] = false;
      },
    });
  }

  isInWishList(product: IProduct): boolean {
    return this.wishlistStatus[product.id] || false;
  }
}
