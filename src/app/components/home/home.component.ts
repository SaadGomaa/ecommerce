import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CountItemsService } from '../../core/services/count-items.service';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    TermtextPipe,
    SearchPipe,
    FormsModule,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  // Call Services
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CountItemsService = inject(CountItemsService);
  private readonly _WishListService = inject(WishListService);

  // Variable to Store Data
  productsList: IProduct[] = [];
  categoriesList: ICategories[] = [];
  searchText: string = '';
  wishlistStatus: { [key: string]: boolean } = {};

  // Create Variable to UnSubscribe
  getAllProductSub!: Subscription;
  getAllCategoriesSub!: Subscription;
  addProductToCartSub!: Subscription;
  removeFromWishListSub!: Subscription;
  inWishListSub!: Subscription;

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 4,
      },
      985: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    // Get All Categories Data From Apis And Store It
    this.getAllCategoriesSub = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList = res.data;
        },
      });

    // Get All Product Data From Apis And Store It
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
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
      this.removeFromWishListSub = this._WishListService.removeFromWishList(product).subscribe({
        next: (res) => {
          this._ToastrService.success('Product remove successfully from your wishlist', '', {
            timeOut: 1900,
            closeButton: true,
            progressBar: true,
          });
          this._CountItemsService.removeItemWish();
          this.wishlistStatus[product.id] = false;
        },
      });
    } else {
      this._WishListService.addToWishList(product).subscribe({
        next: (res) => {
          this._ToastrService.success('Product added successfully to your wishlist', '', {
            timeOut: 1900,
            closeButton: true,
            progressBar: true,
          });
          this._CountItemsService.addItemWish();
          this.wishlistStatus[product.id] = true;
        },
      });
    }
  }

  checkWishlistStatus(product: IProduct) {
    this.inWishListSub = this._WishListService.inWishList(product.id).subscribe({
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

  ngOnDestroy(): void {
    // UnSubscribe Apis when I leave
    this.getAllProductSub?.unsubscribe();
    this.getAllCategoriesSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.removeFromWishListSub?.unsubscribe();
    this.inWishListSub?.unsubscribe();
  }
}
