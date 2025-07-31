import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CountItemsService } from '../../services/count-items.service';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  // Call Services
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CountItemsService = inject(CountItemsService);

  // Variable to Store Data
  detailsList: IProduct | null = null;

  // Create Variable to UnSubscribe
  paramMapSub!: Subscription;
  getSpecificProductsSub!: Subscription;
  addToCartSub!: Subscription;

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this.paramMapSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        this.getSpecificProductsSub = this._ProductsService
          .getSpecificProducts(idProduct)
          .subscribe({
            next: (res) => {
              this.detailsList = res.data;
            },
          });
      },
    });
  }

  addToCart(id: string): void {
    this.addToCartSub = this._CartService.addProductToCart(id).subscribe({
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

  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe();
    this.getSpecificProductsSub?.unsubscribe();
    this.addToCartSub?.unsubscribe();
  }
}
