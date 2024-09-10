import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  constructor(private _HttpClient: HttpClient) {}

  gitWishListItems(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }

  inWishList(productId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/wishlist${productId}`
    );
  }

  addToWishList(product: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl, {
      productId: product.id,
    });
  }

  removeFromWishList(product: any): Observable<any | number> {
    return this._HttpClient.delete(`${this.apiUrl}/${product._id}`);
  }
}
